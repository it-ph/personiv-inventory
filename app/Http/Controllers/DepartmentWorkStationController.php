<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\DepartmentWorkStation;
use App\Department;
use App\WorkStation;
use App\Activity;
use App\ActivityType;
use Auth;
use DB;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class DepartmentWorkStationController extends Controller
{
    public function relation($department_id, $work_station_id)
    {
        return DepartmentWorkStation::where('department_id', $department_id)->where('work_station_id', $work_station_id)->first();
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
        $department_work_stations = DepartmentWorkStation::where('work_station_id', $request->input('0.work_station_id'))->delete();

        for ($i=0; $i < count($request->all()); $i++) { 
            if($request->input($i)){
                $department_work_station = new DepartmentWorkStation;

                $department_work_station->work_station_id = $request->input($i.'.work_station_id');
                $department_work_station->department_id = $request->input($i.'.id');

                $department_work_station->save();

                $activity_type = ActivityType::where('type', 'department_work_station')->where('action', 'create')->first();

                $activity = new Activity;

                $activity->user_id = $request->user()->id;
                $activity->activity_type_id = $activity_type->id;
                $activity->event_id = $department_work_station->id;

                $activity->save();
            }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return DepartmentWorkStation::where('work_station_id', $id)->get();
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
        $deleted = false;
        
        for ($i=0; $i < count($request->all()); $i++) { 
            if(!$deleted){
                DepartmentWorkStation::where('work_station_id', $id)->delete();

                $deleted = true;
            }

            if($request->input($i.'.department_id')){          
                $department_work_station = new DepartmentWorkStation;

                $department_work_station->work_station_id = $id;
                $department_work_station->department_id = $request->input($i.'.department_id');

                $department_work_station->save();

                $activity_type = ActivityType::where('type', 'department_work_station')->where('action', 'create')->first();

                $activity = new Activity;

                $activity->user_id = $request->user()->id;
                $activity->activity_type_id = $activity_type->id;
                $activity->event_id = $department_work_station->id;

                $activity->save();
            }
        }
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
