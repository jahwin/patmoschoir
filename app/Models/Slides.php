<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Slides extends Model
{
    protected $fillable = [
        'image',
        'media_type',
        'video_url',
    ];
}
