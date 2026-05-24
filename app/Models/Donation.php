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
    ];

    protected $casts = [
        'amount' => 'decimal:2',
    ];
}
