<?php

namespace App\Http\Controllers;
use App\Employee;
use App\EmployeeTag;
use App\Log;
use DB;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class EmployeeTagController extends Controller
{
    public function employee($employeeID)
    {
        $employee = DB::table('employee_tags')
            ->join('employees', 'employees.id', '=', 'employee_tags.employee_id')
            ->join('work_stations', 'work_stations.id', '=', 'employee_tags.work_station_id')
            ->select('*', 'work_stations.name as work_station_name', DB::raw('LEFT(employees.full_name, 1) as first_letter'))
            ->where('employees.id', $employeeID)
            ->get();
        
        return $employee;
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
        $this->validate($request, [
            'employee_id' => 'required|numeric',
            'work_station_id' => 'required|numeric',
        ]);

        $employee_tag = new EmployeeTag;

        $employee_tag->employee_id = $request->employee_id;
        $employee_tag->work_station_id = $request->work_station_id;

        $employee_tag->save();

        $employee = Employee::where('id', $request->employee_id)->first();

        $employee->assigned = true;

        $employee->save();

        // create a Log record
        $log = new Log;

        $log->user_id = $request->user()->id;
        $log->activity_id = $employee_tag->id;
        $log->activity = 'assigned a user to a work station.';
        $log->state = 'main.work-station';

        $log->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $employee = DB::table('employee_tags')
            ->join('employees', 'employees.id', '=', 'employee_tags.employee_id')
            ->join('work_stations', 'work_stations.id', '=', 'employee_tags.work_station_id')
            ->select('employees.*')
            ->where('employee_tags.id', $id)
            ->first();

        return response()->json($employee);
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
            'employee_id' => 'required|numeric',
            'work_station_id' => 'required|numeric',
        ]);

        $employee_tag = EmployeeTag::where('id', $id)->first();

        $employee_tag->employee_id = $request->employee_id;
        $employee_tag->work_station_id = $request->work_station_id;

        $employee_tag->save();

        // create a Log record
        $log = new Log;

        $log->user_id = $request->user()->id;
        $log->activity_id = $employee_tag->id;
        $log->activity = 'transfered a user to another work station.';
        $log->state = 'main.work-station';

        $log->save();
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
