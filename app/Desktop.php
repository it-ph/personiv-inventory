<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Desktop extends Model
{
	use SoftDeletes;
	protected $dates = ['deleted_at'];
}
