<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Donation extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'amount',
        'currency',
        'reference',
        'request_token',
        'status',
        'provider_transaction_id',
        'provider_payload',
        'paid_at',
    ];

    protected $casts = [
        'amount'           => 'decimal:2',
        'provider_payload' => 'array',
        'paid_at'          => 'datetime',
    ];
}
