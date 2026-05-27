<?php

namespace App\Services;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class WeflexfyService
{
    public function initiateDonation(array $payload): array
    {
        $baseUrl = rtrim(config('weflexfy.base_url'), '/');
        $endpoint = config('weflexfy.initiate_endpoint');
        $url = $baseUrl . '/' . ltrim($endpoint, '/');
        $accessKey = config('weflexfy.access_key');

        if (empty($accessKey)) {
            return [
                'ok' => false,
                'status' => 500,
                'data' => ['error' => 'Weflexfy access key is not configured'],
                'raw' => 'Access key missing in configuration',
            ];
        }

        try {
            $response = Http::timeout(15)
                ->withHeaders([
                    'access_key' => $accessKey,
                    'Accept'     => 'application/json',
                ])
                ->post($url, $payload);

            return [
                'ok'     => $response->successful(),
                'status' => $response->status(),
                'data'   => $response->json(),
                'raw'    => $response->body(),
            ];
        } catch (ConnectionException $e) {
            return [
                'ok'     => false,
                'status' => 503,
                'data'   => ['error' => 'Payment gateway unreachable'],
                'raw'    => $e->getMessage(),
            ];
        }
    }

    public function buildReference(): string
    {
        return 'donation_' . Str::uuid()->toString();
    }
}
