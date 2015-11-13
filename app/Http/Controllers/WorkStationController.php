<?php

namespace App\Http\Controllers;
use App\WorkStation;
use DB;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class WorkStationController extends Controller
{
    /**
     * Search for workstation according to department id except the exisiting workstation
     *
     * @return \Illuminate\Http\Response
    */

    public function department($departmentID, $workstationID)
    {
        return Workstation::where('department_id', $departmentID)->whereNotIn('id', [$workstationID])->get();
    }

    /**
     * Search database for records
     *
     * @return \Illuminate\Http\Response
    */
    public function search($departmentID, Request $request)
    {
        return DB::table('work_stations')
            ->select('*', DB::raw('SUBSTRING(name, 6, 1) as first_letter'), DB::raw('DATE_FORMAT(created_at, "%h:%i %p, %b. %d, %Y") as created_at'))
            ->where('department_id', $departmentID)
            ->where('name', 'like', '%'. $request->userInput .'%')
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
    public function paginate($departmentID)
    {
        return DB::table('work_stations')->select('*', DB::raw('SUBSTRING(name, 6, 1) as first_letter'), DB::raw('DATE_FORMAT(created_at, "%h:%i %p, %b. %d, %Y") as created_at'))->where('department_id', $departmentID)->whereNull('deleted_at')->orderBy('name')->paginate(25);
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
            'department_id' => 'required|numeric',
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
            $work_station->department_id = $request->department_id;
            $work_station->type = $type;
            $work_station->division = $division;

            $work_station->save();
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
