<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DepartmentWorkStation extends Model
{
    public function activities()
    {
        return $this->hasMany('App\Activity', 'event_id');
    }
}
