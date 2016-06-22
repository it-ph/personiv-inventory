<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AssetPurchaseOrder extends Model
{
	public function purchase_order()
	{
		return $this->belongsTo('App\PurchaseOrder');
	}

	public function asset()
	{
		return $this->belongsTo('App\Asset');
	}
}
