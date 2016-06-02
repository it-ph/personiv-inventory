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

    public function asset()
    {
    	return $this->belongsToMany('App\AssetPurchaseOrder');
    }
}
