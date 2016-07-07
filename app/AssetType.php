<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AssetType extends Model
{
	use SoftDeletes;
	protected $dates = ['deleted_at'];
	
    public function assets()
    {
    	return $this->hasMany('App\Asset');
    }

    public function asset_tags()
    {
        return $this->hasMany('App\AssetTag');
    }

    public function activities()
    {
        return $this->hasMany('App\Activity', 'event_id');
    }
}
