<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Mac extends Model
{
    protected $dates = ['deleted_at']; 
}
