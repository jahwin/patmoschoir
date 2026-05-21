<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Events extends Model
{
    protected $table = 'events';

    protected $fillable = [
        'event_id',
        'title',
        'slug',
        'description',
        'date',
        'start_time',
        'end_time',
        'location',
        'image',
        'booking_link',
        'ussd',
        'visibility',
    ];

    protected $casts = [
        'date' => 'date:Y-m-d',
    ];

    protected static function booted(): void
    {
        static::saving(function (self $event) {
            if (filled($event->title)) {
                $base = Str::slug($event->title);
                $slug = $base;
                $i = 1;

                while (
                    static::where('slug', $slug)
                        ->when($event->exists, fn ($q) => $q->where('id', '!=', $event->id))
                        ->exists()
                ) {
                    $slug = "{$base}-{$i}";
                    $i++;
                }

                $event->slug = $slug;
            }
        });
    }
}
