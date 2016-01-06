<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class OtherComponent extends Model
{
	use SoftDeletes;
    protected $dates = ['deleted_at'];
}
