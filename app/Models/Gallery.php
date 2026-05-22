<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Gallery extends Model
{
    protected $fillable = [
        'title',
        'description',
        'cover',
        'images',
        'year',
        'slug',
        'visibility',
    ];

    protected $casts = [
        'images' => 'array',
    ];

    protected static function booted(): void
    {
        static::saving(function (self $gallery) {
            if (filled($gallery->title)) {
                $base = Str::slug($gallery->title);
                $slug = $base;
                $i = 1;

                while (
                    static::where('slug', $slug)
                        ->when($gallery->exists, fn ($q) => $q->where('id', '!=', $gallery->id))
                        ->exists()
                ) {
                    $slug = "{$base}-{$i}";
                    $i++;
                }

                $gallery->slug = $slug;
            }
        });
    }
}
