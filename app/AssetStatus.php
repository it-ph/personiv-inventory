<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AssetStatus extends Model
{
	use SoftDeletes;
	protected $dates = ['deleted_at'];

    public function asset_tag()
    {
    	return $this->belongsTo('App\AssetTag');
    }

    public function activities()
    {
        return $this->hasMany('App\Activity', 'event_id');
    }
}
