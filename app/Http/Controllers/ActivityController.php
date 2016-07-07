<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Activity;
use Auth;
use DB;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class ActivityController extends Controller
{
    public function paginate()
    {
        return Activity::where('user_id', Auth::user()->id)->orderBy('created_at', 'desc')->with('activity_type', 'user')->paginate(50);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $activity = Activity::where('id', $id)->with('activity_type')->first();

        if($activity->activity_type->type == 'department')
        {
            return Activity::where('id', $id)->with(['department' => function($query){ $query->withTrashed(); }])->with('activity_type', 'user')->first();
        }

        else if ($activity->activity_type->type == 'asset')
        {
            return Activity::where('id', $id)->with(['asset' => function($query){ $query->withTrashed(); }])->with('activity_type', 'user')->first();
        }

        else if ($activity->activity_type->type == 'asset_status')
        {
            return Activity::where('id', $id)->with(['asset_status' => function($query){ $query->withTrashed()->with(['asset_tag' => function($query){ $query->with('asset', 'type'); }]); }])->with('activity_type', 'user')->first();
        }
        
        else if ($activity->activity_type->type == 'asset_tag')
        {
            return Activity::where('id', $id)->with(['asset_tag' => function($query){ $query->withTrashed()->with('asset', 'type'); }])->with('activity_type', 'user')->first();
        }    

        else if ($activity->activity_type->type == 'asset_purchase_order')
        {
            return Activity::where('id', $id)->with(['asset_purchase_order' => function($query){ $query->with('asset'); }])->with('activity_type', 'user')->first();
        }      

        else if ($activity->activity_type->type == 'asset_type')
        {
            return Activity::where('id', $id)->with(['asset_type' => function($query){ $query->withTrashed(); }])->with('activity_type', 'user')->first();
        }

        else if ($activity->activity_type->type == 'department_work_station')
        {
            return Activity::where('id', $id)->with(['department_work_station' => function($query){ $query->with('department', 'work_station'); }])->with('activity_type', 'user')->first();
        }

        else if ($activity->activity_type->type == 'employee')
        {
            return Activity::where('id', $id)->with(['employee' => function($query){ $query->withTrashed(); }])->with('activity_type', 'user')->first();
        }

        else if ($activity->activity_type->type == 'purchase_order')
        {
            return Activity::where('id', $id)->with(['purchase_order' => function($query){ $query->withTrashed(); }])->with('activity_type', 'user')->first();
        }

        else if ($activity->activity_type->type == 'vendor')
        {
            return Activity::where('id', $id)->with(['vendor' => function($query){ $query->withTrashed(); }])->with('activity_type', 'user')->first();
        }

        else if ($activity->activity_type->type == 'work_station')
        {
            return Activity::where('id', $id)->with(['work_station' => function($query){ $query->withTrashed(); }])->with('activity_type', 'user')->first();
        }        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
