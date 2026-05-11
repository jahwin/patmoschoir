<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MusicChannel extends Model
{
    protected $fillable = [
        'logo',
        'link',
        'button_text',
        'service_name',
        'rank',
    ];
}
