<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Projector extends Model
{
    protected $dates = ['deleted_at'];
}
