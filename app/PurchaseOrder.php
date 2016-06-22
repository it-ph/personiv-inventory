<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PurchaseOrder extends Model
{
    use SoftDeletes;
    protected $dates = ['deleted_at'];

    public function vendor()
    {
    	return $this->belongsTo('App\Vendor');
    }

    public function activities()
    {
        return $this->hasMany('App\Activity', 'event_id');
    }

    public function asset_tags()
    {
        return $this->hasMany('App\AssetTag');
    } 

    public function assset_purchase_order()
    {
        return $this->hasMany('App\AssetPurchaseOrder');
    }
}
