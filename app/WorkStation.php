<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class WorkStation extends Model
{
	use SoftDeletes;
    protected $dates = ['deleted_at'];

    public function asset_tags()
    {
    	return $this->hasMany('App\AssetTag');
    }

    public function departments()
    {
    	return $this->belongsToMany('App\Department');
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
