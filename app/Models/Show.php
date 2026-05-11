<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Show extends Model
{
    protected $fillable = [
        'show_date',
        'venue',
        'city',
        'state',
        'title',
        'ticket_button_text',
        'no_tickets_button_text',
        'ticket_url',
    ];

    protected $casts = [
        'show_date' => 'date',
    ];
}
