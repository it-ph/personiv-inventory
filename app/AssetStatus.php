<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AssetStatus extends Model
{
    public function asset_tag()
    {
    	return $this->belongsTo('App\AssetTag');
    }

    public function activities()
    {
        return $this->hasMany('App\Activity', 'event_id');
    }
}
