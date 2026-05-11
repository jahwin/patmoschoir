<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Donation extends Model
{
    protected $fillable = [
        'full_name',
        'email',
        'phone',
        'amount',
        'currency',
        'bill_country',
        'status',
        'reference',
        'provider_transaction_id',
        'iframe_url',
        'provider_payload',
        'initiated_at',
        'paid_at',
    ];

    protected $casts = [
        'provider_payload' => 'array',
        'initiated_at' => 'datetime',
        'paid_at' => 'datetime',
    ];
}
