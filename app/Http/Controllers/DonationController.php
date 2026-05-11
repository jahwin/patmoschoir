<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use App\Services\WeflexfyService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class DonationController extends Controller
{
    public function initiate(Request $request, WeflexfyService $weflexfy): JsonResponse
    {
        $validated = $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'amount' => ['required', 'numeric', 'min:0.01'],
        ]);

        $reference = $weflexfy->buildReference();

        $donation = Donation::create([
            'full_name' => $validated['full_name'],
            'email' => $validated['email'] ?? null,
            'phone' => $validated['phone'] ?? null,
            'amount' => $validated['amount'],
            'currency' => config('weflexfy.default_currency', 'USD'),
            'bill_country' => config('weflexfy.bill_country', 'RW'),
            'status' => 'initiated',
            'reference' => $reference,
            'initiated_at' => now(),
        ]);

        $payload = [
            'amount' => $donation->amount,
            'currency' => $donation->currency,
            'billCountry' => $donation->bill_country,
            'reference' => $donation->reference,
            'description' => 'Donation to Ministry',
            'transfers' => [
                [
                    'recipientNumber' => config('weflexfy.recipient_number'),
                    'percentage' => 100,
                ],
            ],
            'customer' => [
                'name' => $donation->full_name,
                'email' => $donation->email,
                'phone' => $donation->phone,
            ],
        ];

        $response = $weflexfy->initiateDonation($payload);

        if (!$response['ok'] || !is_array($response['data'])) {
            Log::warning('Weflexfy donation initiation failed', [
                'reference' => $reference,
                'status' => $response['status'],
                'body' => $response['raw'],
            ]);

            $donation->status = 'failed';
            $donation->provider_payload = $response['data'] ?? ['raw' => $response['raw']];
            $donation->save();

            return response()->json([
                'message' => 'Unable to initiate donation. Please try again.',
            ], 422);
        }

        // The API response structure is: { message, status, data: { iframeUrl, ... } }
        $apiData = $response['data']['data'] ?? $response['data'] ?? [];
        $iframeUrl = $apiData['iframeUrl'] ?? $apiData['iframe_url'] ?? null;
        $transactionId = $apiData['transactionId'] ?? $apiData['transaction_id'] ?? $apiData['requestToken'] ?? null;

        if (!$iframeUrl) {
            Log::warning('Weflexfy response missing iframe URL', [
                'reference' => $reference,
                'payload' => $response['data'],
            ]);

            $donation->status = 'failed';
            $donation->provider_payload = $response['data'];
            $donation->save();

            return response()->json([
                'message' => 'Payment gateway did not return a payment link.',
            ], 422);
        }

        $donation->status = 'pending';
        $donation->iframe_url = $iframeUrl;
        $donation->provider_transaction_id = $transactionId;
        $donation->provider_payload = $response['data'];
        $donation->save();

        return response()->json([
            'iframe_url' => $iframeUrl,
            'donation_id' => $donation->id,
            'reference' => $donation->reference,
        ]);
    }
}
