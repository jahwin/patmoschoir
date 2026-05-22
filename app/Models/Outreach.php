<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Outreach extends Model
{
    protected $fillable = [
        'title',
        'description',
        'image',
        'location',
        'date',
        'start_time',
        'end_time',
        'visibility',
    ];
}
