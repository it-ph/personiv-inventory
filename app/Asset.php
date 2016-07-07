<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Asset extends Model
{
	use SoftDeletes;
	protected $dates = ['deleted_at'];

    public function type()
    {
    	return $this->belongsTo('App\AssetType', 'asset_type_id');
    }

    public function details()
    {
    	return $this->hasMany('App\AssetDetail');
    }

    public function asset_tags()
    {
    	return $this->hasMany('App\AssetTag');
    }

    public function asset_purchase_order()
    {
        return $this->hasMany('App\AssetPurchaseOrder');
    }

    public function activity()
    {
        return $this->hasMany('App\Activity', 'event_id');
    }
}
