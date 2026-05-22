<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Streaming extends Model
{
    protected $fillable = [
        'title',
        'description',
        'cover',
        'date',
        'start_time',
        'end_time',
        'location',
        'link',
        'stream_id',
        'stream_url',
        'visibility',
    ];

    protected $casts = [
        'date' => 'date:Y-m-d',
    ];

    protected static function booted(): void
    {
        static::creating(function (self $streaming) {
            if (empty($streaming->stream_id)) {
                $streaming->stream_id = Str::uuid()->toString();
            }
        });
    }
}
