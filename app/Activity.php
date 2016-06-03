<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    public function activity_type()
    {
    	return $this->belongsTo('App\ActivityType');
    }

    public function department()
    {
    	return $this->belongsTo('App\Department', 'event_id');
    }

	public function asset()
    {
    	return $this->belongsTo('App\Department', 'event_id');
    }

    public function asset_status()
    {
    	return $this->belongsTo('App\AssetStatus', 'event_id');
    }

    public function asset_tag()
    {
    	return $this->belongsTo('App\AssetTag', 'event_id');
    }

    public function asset_type()
    {
    	return $this->belongsTo('App\AssetType', 'event_id');
    }

    public function department_work_station()
    {
    	return $this->belongsTo('App\DepartmentWorkStation', 'event_id');
    }

    public function employee()
    {
    	return $this->belongsTo('App\Employee', 'event_id');
    }

	public function purchase_order()
    {
    	return $this->belongsTo('App\PurchaseOrder', 'event_id');
    }    

    public function vendor()
    {
    	return $this->belongsTo('App\Vendor', 'event_id');
    }

	public function work_station()
    {
    	return $this->belongsTo('App\WorkStation', 'event_id');
    }    
}
