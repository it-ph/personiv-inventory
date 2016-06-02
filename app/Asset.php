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
    	return $this->belongsTo('App\AssetType');
    }

    public function details()
    {
    	return $this->hasMany('App\AssetDetail');
    }

    public function asset_tags()
    {
    	return $this->hasMany('App\AssetTag');
    }

    public function purchase_order()
    {
        return $this->belongsToMany('App\AssetPurchaseOrder');
    }
}
