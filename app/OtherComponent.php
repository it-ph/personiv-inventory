<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class OtherComponent extends Model
{
    protected $dates = ['deleted_at'];
}
