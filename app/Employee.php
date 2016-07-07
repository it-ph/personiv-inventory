<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Employee extends Model
{
	use SoftDeletes;
    protected $dates = ['deleted_at'];

    public function department()
    {
    	return $this->belongsTo('App\Department');
    }

    public function work_station()
    {
    	return $this->belongsTo('App\WorkStation');
    }

    public function activities()
    {
        return $this->hasMany('App\Activity', 'event_id');
    }
}
