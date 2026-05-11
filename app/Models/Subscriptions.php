<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subscriptions extends Model
{
    protected $table = 'subscriptions';

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
    ];
}


