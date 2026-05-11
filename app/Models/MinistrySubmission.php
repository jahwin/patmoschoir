<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MinistrySubmission extends Model
{
    protected $table = 'ministry_submissions';

    protected $fillable = [
        'full_name',
        'phone',
        'email',
    ];
}
