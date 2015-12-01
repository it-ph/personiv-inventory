<?php

namespace App\Http\Controllers;
use App\WorkStation;
use App\Log;
use DB;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class WorkStationController extends Controller
{
    /**
     * Search for vacant workstation
     *
     * @return \Illuminate\Http\Response
    */
    public function vacant(Request $request)
    {
        return DB::table('work_stations')
            ->where('occupied', false)
            ->where('type', $request->type)
            ->where('division', $request->division)
            ->whereNull('deleted_at')
            ->get();
    }

    /**
     * Search for workstation according to department id except the exisiting workstation
     *
     * @return \Illuminate\Http\Response
    */

    public function department($departmentID, $workstationID)
    {
        return DB::table('work_stations')
            ->join('work_station_tags', 'work_station_tags.work_station_id', '=', 'work_stations.id')
            ->join('departments', 'departments.id', '=', 'work_station_tags.department_id')
            ->select('work_stations.*')
            ->where('work_station_tags.department_id', $departmentID)
            ->whereNotIn('work_stations.id', [$workstationID])
            ->get();
        // return Workstation::where('department_id', $departmentID)->whereNotIn('id', [$workstationID])->get();
    }

    /**
     * Search database for records by department
     *
     * @return \Illuminate\Http\Response
    */
    public function search(Request $request)
    {
        return DB::table('work_stations')
            ->select('*', DB::raw('SUBSTRING(work_stations.name, 6, 1) as first_letter'), DB::raw('DATE_FORMAT(work_stations.created_at, "%h:%i %p, %b. %d, %Y") as created_at'))
            ->where('work_stations.name', 'like', '%'. $request->userInput .'%')
            ->whereNull('work_stations.deleted_at')
            ->groupBy('work_stations.id')
            ->orderBy('work_stations.name')
            ->get();
    }

    /**
     * Search database for records by department
     *
     * @return \Illuminate\Http\Response
    */
    public function searchDepartment($departmentID, Request $request)
    {
        return DB::table('work_stations')
            ->join('work_station_tags', 'work_station_tags.work_station_id', '=', 'work_stations.id')
            ->join('departments', 'departments.id', '=', 'work_station_tags.department_id')
            ->select('work_stations.*', 'departments.id as department_id', DB::raw('SUBSTRING(work_stations.name, 6, 1) as first_letter'), DB::raw('DATE_FORMAT(work_stations.created_at, "%h:%i %p, %b. %d, %Y") as created_at'))
            ->where('work_station_tags.department_id', $departmentID)
            ->where('work_stations.name', 'like', '%'. $request->userInput .'%')
            ->whereNull('work_stations.deleted_at')
            ->groupBy('work_stations.id')
            ->orderBy('work_stations.name')
            ->get();
    }
    /**
     * Paginate listing of the resource.
     * 
     * @return  \Illuminate\Http\Response
    */
    public function paginate()
    {
        return DB::table('work_stations')
            ->select('work_stations.*', DB::raw('SUBSTRING(work_stations.name, 6, 1) as first_letter'), DB::raw('DATE_FORMAT(work_stations.created_at, "%h:%i %p, %b. %d, %Y") as created_at'))
            ->whereNull('work_stations.deleted_at')
            // ->groupBy('work_stations.id')
            ->orderBy('work_stations.name')
            ->paginate(25);
    }

    /**
     * Paginate listing of the resource by department.
     * 
     * @return  \Illuminate\Http\Response
    */
    public function paginateDepartment($departmentID)
    {
        return DB::table('work_stations')
            ->join('work_station_tags', 'work_station_tags.work_station_id', '=', 'work_stations.id')
            ->join('departments', 'departments.id', '=', 'work_station_tags.department_id')
            ->select('work_stations.*', 'departments.id as department_id', DB::raw('SUBSTRING(work_stations.name, 6, 1) as first_letter'), DB::raw('DATE_FORMAT(work_station_tags.created_at, "%h:%i %p, %b. %d, %Y") as created_at'))
            ->where('work_station_tags.department_id', $departmentID)
            ->whereNull('work_stations.deleted_at')
            ->groupBy('work_stations.id')
            ->orderBy('work_stations.name')
            ->paginate(25);
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
            'name' => 'required|string',
            'quantity' =>'required|numeric',
        ]);

        // determine the type of department if production or admin
        $type = substr($request->name, 5, 1) == 'P' ? 'production' : 'admin';
        // determine where in the building are they
        $division = substr($request->name, 3, 1);

        // gets the last station
        $last_station =  Workstation::where('type', $type)->where('division', $division)->orderBy('id', 'desc')->first();

        if($last_station){
            $last_station_name = $last_station->name;
        }
        else{
            $last_station_name = null;
        }

        // if it exists get the last 3 character to gets its number otherwise default is 0;
        $last_station_number = $last_station_name ? (int)substr($last_station_name, -3): 0;

        // Generate Workstation records until it meets number of quantity
        for ($i=0; $i < $request->quantity; $i++) { 
            // increment last station number
            $last_station_number++;

            // if last station number is less that 10 concat 2 leading zeroes
            if($last_station_number < 10){
                $concat_station_number = '00'. $last_station_number;
            }
            // else if last station number is less that 99 concat 2 leading zeroes
            else if($last_station_number < 100){
                $concat_station_number = '0'. $last_station_number;
            }
            // else use the last station number as is
            else{
                $concat_station_number = $last_station_number;
            }


            // create a new instance of Workstation
            $work_station = new Workstation;
            // concat the station number
            $work_station->name = $request->name . $concat_station_number;
            $work_station->type = $type;
            $work_station->division = $division;
            $work_station->occupied = false;

            $work_station->save();
        }

        // create a Log record
        $log = new Log;

        $log->user_id = $request->user()->id;
        $log->activity_id = $work_station->id;
        $log->activity = 'added '. $request->quantity . ' new work stations.';
        $log->state = 'main.floor-plan';

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
        return Workstation::where('id', $id)->first();
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
