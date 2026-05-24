<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use App\Services\WeflexfyService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
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
            'currency' => ['nullable', 'string', 'in:USD,RWF'],
        ]);

        $reference = $weflexfy->buildReference();
        $currency = $validated['currency'] ?? config('weflexfy.default_currency', 'USD');

        $donation = Donation::create([
            'name' => $validated['full_name'],
            'email' => $validated['email'] ?? null,
            'phone' => $validated['phone'] ?? null,
            'amount' => $validated['amount'],
            'currency' => $currency,
        ]);

        $payload = [
            'amount' => $donation->amount,
            'currency' => $donation->currency,
            'billCountry' => config('weflexfy.bill_country', 'RW'),
            'reference' => $reference,
            'description' => 'Donation to Ministry',
            'transfers' => [
                [
                    'recipientNumber' => config('weflexfy.recipient_number'),
                    'percentage' => 100,
                ],
            ],
            'customer' => [
                'name' => $donation->name,
                'email' => $donation->email,
                'phone' => $donation->phone,
            ],
        ];

        $response = $weflexfy->initiateDonation($payload);

        if (!$response['ok'] || !is_array($response['data'])) {
            Log::warning('Weflexfy donation initiation failed', [
                'reference' => $reference,
                'donation_id' => $donation->id,
                'status' => $response['status'],
                'body' => $response['raw'],
            ]);

            return response()->json([
                'message' => 'Unable to initiate donation. Please try again.',
            ], 422);
        }

        $apiData = $response['data']['data'] ?? $response['data'] ?? [];
        $iframeUrl = $apiData['iframeUrl'] ?? $apiData['iframe_url'] ?? null;

        if (!$iframeUrl) {
            Log::warning('Weflexfy response missing iframe URL', [
                'reference' => $reference,
                'donation_id' => $donation->id,
                'payload' => $response['data'],
            ]);

            return response()->json([
                'message' => 'Payment gateway did not return a payment link.',
            ], 422);
        }

        return response()->json([
            'iframe_url' => $iframeUrl,
            'donation_id' => $donation->id,
            'reference' => $reference,
        ]);
    }
}
