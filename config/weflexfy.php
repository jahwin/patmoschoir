<?php

return [
    'base_url' => env('WEFLEXFY_BASE_URL', 'https://api.weflexfy.com'),
    'access_key' => env('WEFLEXFY_ACCESS_KEY'),
    'secret_key' => env('WEFLEXFY_SECRET_KEY'),
    'recipient_number' => env('WEFLEXFY_RECIPIENT_NUMBER'),
    'bill_country' => env('WEFLEXFY_BILL_COUNTRY', 'RW'),
    'default_currency' => env('WEFLEXFY_DEFAULT_CURRENCY', 'USD'),
    'initiate_endpoint' => env('WEFLEXFY_INITIATE_ENDPOINT', '/api/v1/payment/initiate'),
];
