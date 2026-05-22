<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonials extends Model
{
    protected $fillable = [
        'platform',
        'message',
        'name',
        'title',
        'handle',
        'date',
        'visibility',
        'status',
        'verified',
    ];

    protected $casts = [
        'verified' => 'boolean',
    ];
}
