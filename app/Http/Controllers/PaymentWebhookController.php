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
        $token = $request->header('Token');

        if (!$token) {
            return response()->json(['message' => 'Missing token.'], 401);
        }

        try {
            JWT::decode($token, new Key(config('weflexfy.secret_key'), 'HS256'));
        } catch (\Throwable $e) {
            Log::warning('Invalid Weflexfy webhook token', [
                'error' => $e->getMessage(),
            ]);
            return response()->json(['message' => 'Invalid token.'], 401);
        }

        $payload = $request->all();

        $reference = $payload['reference'] ?? $payload['reference_id'] ?? $payload['referenceId'] ?? null;
        $transactionId = $payload['transactionId'] ?? $payload['transaction_id'] ?? $payload['payment_id'] ?? null;

        if (!$reference && !$transactionId) {
            Log::warning('Weflexfy webhook missing reference', [
                'payload' => $payload,
            ]);
            return response()->json(['message' => 'Missing reference.'], 422);
        }

        $donation = Donation::query()
            ->when($reference, fn ($query) => $query->where('reference', $reference))
            ->when(!$reference && $transactionId, fn ($query) => $query->where('provider_transaction_id', $transactionId))
            ->first();

        if (!$donation) {
            Log::warning('Weflexfy webhook donation not found', [
                'reference' => $reference,
                'transaction_id' => $transactionId,
            ]);
            return response()->json(['message' => 'Donation not found.'], 404);
        }

        $statusValue = $payload['status'] ?? $payload['payment_status'] ?? $payload['state'] ?? null;
        $statusValue = is_string($statusValue) ? strtolower($statusValue) : null;

        $successStates = ['success', 'successful', 'paid', 'completed'];
        $failedStates = ['failed', 'cancelled', 'canceled', 'expired'];

        if (in_array($statusValue, $successStates, true)) {
            if ($donation->status !== 'success') {
                $donation->status = 'success';
                $donation->paid_at = now();
            }
        } elseif (in_array($statusValue, $failedStates, true)) {
            $donation->status = 'failed';
        } else {
            $donation->status = $donation->status === 'success' ? 'success' : 'pending';
        }

        if ($transactionId) {
            $donation->provider_transaction_id = $transactionId;
        }

        $donation->provider_payload = $payload;
        $donation->save();

        return response()->json(['message' => 'Webhook processed.']);
    }
}
