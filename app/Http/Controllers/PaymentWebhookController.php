<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PaymentWebhookController extends Controller
{
    public function handle(Request $request): JsonResponse
    {
        $payload = $request->all();

        // Weflexfy sends the JWT in the request body as `token`, not a header
        $token = $payload['token'] ?? null;

        if (!$token) {
            Log::warning('Weflexfy webhook: missing token in body', ['payload' => $payload]);
            return response()->json(['message' => 'Missing token.'], 401);
        }

        // Decode the JWT — all useful data is inside it
        try {
            $decoded = (array) JWT::decode($token, new Key(config('weflexfy.secret_key'), 'HS256'));
        } catch (\Throwable $e) {
            Log::warning('Weflexfy webhook: invalid JWT', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Invalid token.'], 401);
        }

        $requestType = $payload['requestType'] ?? null;

        Log::info('Weflexfy webhook received', [
            'requestType' => $requestType,
            'decoded'     => $decoded,
        ]);

        // Only process payment webhooks (ignore transfer settlement webhooks)
        if ($requestType !== 'payment') {
            return response()->json(['message' => 'Webhook acknowledged.']);
        }

        // JWT payload contains: requestToken, paymentRef, status, amount
        $requestToken = $decoded['requestToken'] ?? null;
        $paymentRef   = $decoded['paymentRef']   ?? null;
        $status       = isset($decoded['status']) ? strtoupper($decoded['status']) : null;

        // Find donation — try requestToken first, then fall back to paymentRef (our reference)
        $donation = null;

        if ($requestToken) {
            $donation = Donation::where('request_token', $requestToken)->first();
        }

        if (!$donation && $paymentRef) {
            $donation = Donation::where('reference', $paymentRef)->first();
        }

        if (!$donation) {
            Log::warning('Weflexfy webhook: donation not found', [
                'requestToken' => $requestToken,
                'paymentRef'   => $paymentRef,
            ]);
            return response()->json(['message' => 'Donation not found.'], 404);
        }

        // Map Weflexfy status → our status
        if ($status === 'SUCCESS') {
            if ($donation->status !== 'success') {
                $donation->status  = 'success';
                $donation->paid_at = now();

                try {
                    $donation->donation_number = (Donation::max('donation_number') ?? 0) + 1;
                } catch (\Throwable $e) {
                    Log::warning('Could not assign donation number', ['donation_id' => $donation->id, 'error' => $e->getMessage()]);
                }
            }
        } elseif (in_array($status, ['FAILED', 'CANCELLED', 'CANCELED', 'EXPIRED'], true)) {
            $donation->status = 'failed';
        }

        // Store Weflexfy's requestToken if we didn't have it yet
        if ($requestToken && !$donation->request_token) {
            $donation->request_token = $requestToken;
        }

        $donation->provider_payload = $payload;
        $donation->save();

        Log::info('Weflexfy webhook: donation updated', [
            'donation_id' => $donation->id,
            'status'      => $donation->status,
        ]);

        return response()->json(['message' => 'Webhook processed.']);
    }
}
