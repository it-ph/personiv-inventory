<?php

namespace App\Http\Controllers;
use App\Department;
use App\Activity;
use App\ActivityType;
use Auth;
use DB;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class DepartmentController extends Controller
{
    public function checkDepartment(Request $request)
    {
        $department = $request->id ? Department::whereNotIn('id', [$request->id])->where('name', $request->name)->first() : Department::where('name', $request->name)->first();

        return response()->json($department ? true : false);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Department::with('work_stations')->orderBy('name')->get();
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
        $this->validate($request, [
            'name' => 'required'
        ]);

        $department = Department::where('name', $request->name)->first();

        if($department)
        {
            return response()->json(true);
        }

        $department = new Department;

        $department->name = $request->name;

        $department->save();

        // Search the activity type
        $activity_type = ActivityType::where('type', 'department')->where('action', 'create')->first();

        // create an activity log
        $activity = new Activity;

        $activity->user_id = $request->user()->id;
        $activity->activity_type_id = $activity_type->id;
        $activity->event_id = $department->id;

        $activity->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Department::where('id', $id)->first();
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
        $this->validate($request, [
            'name' => 'required'
        ]);

        $department = Department::whereNotIn('id', [$id])->where('name', $request->name)->first();

        if($department)
        {
            return response()->json(true);
        }

        $department = Department::where('id', $id)->first();

        $department->name = $request->name;

        $department->save();

        // Search the activity type
        $activity_type = ActivityType::where('type', 'department')->where('action', 'update')->first();

        // create an activity log
        $activity = new Activity;

        $activity->user_id = $request->user()->id;
        $activity->activity_type_id = $activity_type->id;
        $activity->event_id = $department->id;

        $activity->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $department = Department::where('id', $id)->first();
        
        // Search the activity type
        $activity_type = ActivityType::where('type', 'department')->where('action', 'delete')->first();

        // create an activity log
        $activity = new Activity;

        $activity->user_id = Auth::user()->id;
        $activity->activity_type_id = $activity_type->id;
        $activity->event_id = $department->id;

        $activity->save();

        $department->delete();
    }
}
