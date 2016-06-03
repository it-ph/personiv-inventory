<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Vendor extends Model
{
    use SoftDeletes;
    protected $dates = ['deleted_at'];

    public function purchace_orders()
    {
    	return $this->hasMany('App\PurchaseOrder');
    }

    public function activities()
    {
        return $this->hasMany('App\Activity', 'event_id');
    }
}
