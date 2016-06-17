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

    public function activities()
    {
        return $this->hasMany('App\Activity', 'event_id');
    }

    public function type()
    {
        return $this->belongsTo('App\AssetType', 'asset_type_id');
    }

    public function purchase_order()
    {
        return $this->belongsTo('App\PurchaseOrder');
    }
}
