<?php

namespace App\Http\Controllers;
use App\Employee;
use App\Log;
use DB;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class EmployeeController extends Controller
{
    public function department($departmentID)
    {
        return DB::table('employees')
            ->where('department_id', $departmentID)
            ->where('assigned', false)
            ->get();
    }
    /**
     * Search assigned employee to the workstation
     *
     * @return \Illuminate\Http\Response
    */
    public function workstation($workStationID)
    {
        return DB::table('employees')
            ->join('employee_tags', 'employee_tags.employee_id', '=', 'employees.id')
            ->select('employees.*', 'employee_tags.id as employee_tag_id', DB::raw('LEFT(employees.full_name, 1) as first_letter'))
            ->where('work_station_id', $workStationID)
            ->whereNull('employee_tags.deleted_at')
            ->get();
    }
    /**
     * Search database for records
     *
     * @return \Illuminate\Http\Response
    */
    public function search($departmentID, Request $request)
    {
        return DB::table('employees')
            ->select('*', DB::raw('LEFT(full_name, 1) as first_letter'), DB::raw('DATE_FORMAT(created_at, "%h:%i %p, %b. %d, %Y") as created_at'))
            ->where('department_id', $departmentID)
            ->where('full_name', 'like', '%'. $request->userInput .'%')
            ->orWhere('employee_id', 'like', '%'. $request->userInput .'%')
            ->whereNull('deleted_at')
            ->groupBy('id')
            ->orderBy('updated_at', 'desc')
            ->get();
    }
    /**
     * Paginate listing of the resource.
     * 
     * @return  \Illuminate\Http\Response
    */
    public function paginate()
    {
        return DB::table('employees')
            ->select('*', DB::raw('LEFT(full_name, 1) as first_letter'), DB::raw('DATE_FORMAT(created_at, "%h:%i %p, %b. %d, %Y") as created_at'))
            ->whereNull('deleted_at')
            ->orderBy('updated_at', 'desc')
            ->paginate(25);
    }

    /**
     * Paginate listing of the resource.
     * 
     * @return  \Illuminate\Http\Response
    */
    public function paginateDepartment($departmentID)
    {
        return DB::table('employees')->select('*', DB::raw('LEFT(full_name, 1) as first_letter'), DB::raw('DATE_FORMAT(created_at, "%h:%i %p, %b. %d, %Y") as created_at'))->where('department_id', $departmentID)->whereNull('deleted_at')->orderBy('updated_at', 'desc')->paginate(25);
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
        // validate request input
        $this->validate($request, [
            'employee_id' => 'required|string',
            'full_name' => 'required|string',
        ]);

        // create a new instance of desktop
        $employee = new Employee;

        // assign its properties
        $employee->employee_id = $request->employee_id;
        $employee->full_name = $request->full_name;
        $employee->department_id = $request->department_id;
        $employee->assigned = false;

        // save to database
        $employee->save();

        // create a Log record
        $log = new Log;

        $log->user_id = $request->user()->id;
        $log->activity_id = $employee->department_id;
        $log->activity = 'added a new Employee.';
        $log->state = 'main.department';

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
        return Employee::where('id', $id)->first();
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
