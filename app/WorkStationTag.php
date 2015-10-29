<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class WorkStationTag extends Model
{
    protected $dates = ['deleted_at'];
}
