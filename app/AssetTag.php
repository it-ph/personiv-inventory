<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AssetTag extends Model
{
	use SoftDeletes;
    protected $dates = ['deleted_at'];

    public function status()
    {
    	return $this->hasMany('App\AssetStatus');
    }

    public function asset()
    {
    	return $this->belongsTo('App\Asset');
    }

    public function work_station()
    {
    	return $this->belongsTo('App\WorkStation');
    }

    public function details()
    {
    	return $this->hasManyThrough('App\AssetDetail', 'App\Asset');
    }
}
