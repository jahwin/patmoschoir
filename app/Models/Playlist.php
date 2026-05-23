<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Playlist extends Model
{
    protected $fillable = [
        'name',
        'description',
        'image',
        'links',
        'tracks',
        'year',
    ];

    protected $casts = [
        'links'  => 'array',
        'tracks' => 'integer',
    ];
}
