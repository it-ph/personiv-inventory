<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Department extends Model
{
	use SoftDeletes;
    protected $dates = ['deleted_at'];

    public function work_stations()
    {
    	return $this->belongsToMany('App\WorkStation');
    }

    public function employees()
    {
    	return $this->hasMany('App\Employee');
    }

    public function activities()
    {
        return $this->hasMany('App\Activity', 'event_id');
    }
}
