<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Telephone extends Model
{
	use SoftDeletes;
    protected $dates = ['deleted_at'];
}
