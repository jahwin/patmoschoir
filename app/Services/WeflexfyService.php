<?php

namespace App\Services;

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

        $response = Http::withHeaders([
            'access_key' => $accessKey,
            'Accept' => 'application/json',
        ])->post($url, $payload);

        return [
            'ok' => $response->successful(),
            'status' => $response->status(),
            'data' => $response->json(),
            'raw' => $response->body(),
        ];
    }

    public function buildReference(): string
    {
        return 'donation_' . Str::uuid()->toString();
    }
}
