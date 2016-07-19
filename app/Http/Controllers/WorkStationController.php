<?php

namespace App\Http\Controllers;
use App\WorkStation;
use App\Activity;
use App\ActivityType;
use App\Asset;
use DB;
use Auth;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class WorkStationController extends Controller
{
    public function others($id)
    {
        return Workstation::with('departments')->whereNotIn('id', [$id])->get();
    }
    public function checkIP(Request $request, $id)
    {
        $duplicate =  $id ? Workstation::where('ip_address', $request->ip_address)->whereNotNull('ip_address')->whereNotIn('id', [$id])->first() : Workstation::where('ip_address', $request->ip_address)->whereNotNull('ip_address')->first();

        return response()->json($duplicate ? true : false);
    }

    public function availableTransfer(Request $request, $workstationID)
    {
        return DB::table('work_stations')
            ->join('work_station_tags', 'work_station_tags.work_station_id', '=', 'work_stations.id')
            ->join('departments', 'departments.id', '=', 'work_station_tags.department_id')
            ->select('work_stations.*')
            ->where('work_station_tags.department_id', $request->department)
            ->where('work_stations.floor', $request->floor)
            ->where('work_stations.division', $request->division)
            ->whereNotIn('work_stations.id', [$workstationID])
            ->get();
    }
    public function floors($department_id)
    {
        return DB::table('work_stations')
            ->join('work_station_tags', 'work_station_tags.work_station_id', '=', 'work_stations.id')
            ->select(DB::raw("DISTINCT work_stations.floor"))
            ->where('work_station_tags.department_id', $department_id)
            ->get();
    }

    public function divisions($department_id, $floor)
    {
        return DB::table('work_stations')
            ->join('work_station_tags', 'work_station_tags.work_station_id', '=', 'work_stations.id')
            ->select(DB::raw("DISTINCT work_stations.division"))
            ->where('work_station_tags.department_id', $department_id)
            ->where('work_stations.floor', $floor)
            ->get();
    }
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

    public function departmentPaginate($departmentID, $workstationID)
    {
        return DB::table('work_stations')
            ->join('work_station_tags', 'work_station_tags.work_station_id', '=', 'work_stations.id')
            ->join('departments', 'departments.id', '=', 'work_station_tags.department_id')
            ->select('work_stations.*')
            ->where('work_station_tags.department_id', $departmentID)
            ->whereNotIn('work_stations.id', [$workstationID])
            ->orderBy('work_stations.name')
            ->paginate(25);
        // return Workstation::where('department_id', $departmentID)->whereNotIn('id', [$workstationID])->get();
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
        return Workstation::with('departments')->where('name', 'like', '%'. $request->searchText .'%')->orWhere('ip_address', 'like', '%'. $request->searchText .'%')->get();
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
            ->select('work_stations.*', 'departments.id as department_id', DB::raw('SUBSTRING(work_stations.name, 7, 1) as first_letter'), DB::raw('DATE_FORMAT(work_stations.created_at, "%h:%i %p, %b. %d, %Y") as created_at'))
            ->where('work_station_tags.department_id', $departmentID)
            ->where('work_stations.name', 'like', '%'. $request->userInput .'%')
            ->whereNull('work_stations.deleted_at')
            ->groupBy('work_stations.id')
            ->get();
    }
    /**
     * Paginate listing of the resource.
     * 
     * @return  \Illuminate\Http\Response
    */
    public function paginate()
    {
        return WorkStation::with('departments')->orderBy('name')->paginate(25);
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
            ->select('work_stations.*', 'departments.id as department_id', DB::raw('SUBSTRING(work_stations.name, 7, 1) as first_letter'), DB::raw('DATE_FORMAT(work_station_tags.created_at, "%h:%i %p, %b. %d, %Y") as created_at'))
            ->where('work_station_tags.department_id', $departmentID)
            ->whereNull('work_stations.deleted_at')
            ->groupBy('work_stations.id')
            ->paginate(25);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Workstation::all();
    }

    public function dashboard()
    {
        $work_station_6FA = Workstation::with('departments')->where('floor', 6)->where('division', 'A')->get();
        $work_station_6FB = Workstation::with('departments')->where('floor', 6)->where('division', 'B')->get();
        $work_station_10FA = Workstation::with('departments')->where('floor', 10)->where('division', 'A')->get();
        $work_station_10FB = Workstation::with('departments')->where('floor', 10)->where('division', 'B')->get();

        $occupied_6FA_count = 0;
        $occupied_6FB_count = 0;
        $occupied_10FA_count = 0;
        $occupied_10FB_count = 0;

        $vacant_6FA_count = 0;
        $vacant_6FB_count = 0;
        $vacant_10FA_count = 0;
        $vacant_10FB_count = 0;

        foreach ($work_station_6FA as $work_station_6FA_key => $work_station_6FA_value) {
            if(count($work_station_6FA_value->departments)){
                $occupied_6FA_count = $occupied_6FA_count + 1;
            }
            else{
                $vacant_6FA_count = $vacant_6FA_count + 1;
            }
        }

        foreach ($work_station_6FB as $work_station_6FB_key => $work_station_6FB_value) {
            if(count($work_station_6FB_value->departments)){
                $occupied_6FB_count = $occupied_6FB_count + 1;
            }
            else{
                $vacant_6FB_count = $vacant_6FB_count + 1;
            }
        }

        foreach ($work_station_10FA as $work_station_10FA_key => $work_station_10FA_value) {
            if(count($work_station_10FA_value->departments)){
                $occupied_10FA_count = $occupied_10FA_count + 1;
            }
            else{
                $vacant_10FA_count = $vacant_10FA_count + 1;
            }
        }

        foreach ($work_station_10FB as $work_station_10FB_key => $work_station_10FB_value) {
            if(count($work_station_10FB_value->departments)){
                $occupied_10FB_count = $occupied_10FB_count + 1;
            }
            else{
                $vacant_10FB_count = $vacant_10FB_count + 1;
            }
        }

        $user = Auth::user();

        $user->occupied_6FA_count = $occupied_6FA_count;
        $user->occupied_6FB_count = $occupied_6FB_count;
        $user->occupied_10FA_count = $occupied_10FA_count;
        $user->occupied_10FB_count = $occupied_10FB_count;

        $user->vacant_6FA_count = $vacant_6FA_count;
        $user->vacant_6FB_count = $vacant_6FB_count;
        $user->vacant_10FA_count = $vacant_10FA_count;
        $user->vacant_10FB_count = $vacant_10FB_count;

        return $user;
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
            'floor' => 'required|string',
            'division' => 'required|string',
            'type' => 'required|string',
            'quantity' =>'required|numeric',
        ]);

        $activity_type = ActivityType::where('type', 'work_station')->where('action', 'create')->first();
        $type = $request->type == 'A' ? 'admin' : 'production';

        // gets the last station
        $last_station =  Workstation::where('floor', $request->floor)->where('type', $type)->where('division', $request->division)->orderBy('id', 'desc')->first();

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
            $work_station->name = 'A' . $request->floor . '-' . $request->division . '-' . $request->type . $concat_station_number;
            $work_station->floor = $request->floor;
            $work_station->division = $request->division;
            $work_station->type = $type;

            $work_station->save();
            
            $activity = new Activity;
            $activity->user_id = $request->user()->id;
            $activity->activity_type_id = $activity_type->id;
            $activity->event_id = $work_station->id;

            $activity->save();
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
        $work_station = Workstation::with(['asset_tags' => function($query){ $query->with('status', 'purchase_order'); }])->with('departments')->where('id', $id)->first();

        foreach ($work_station->asset_tags as $key => $value) {
            $value->asset = Asset::with('details', 'type')->where('id', $value->asset_id)->whereNull('deleted_at')->first();
        }

        return $work_station;
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
        $duplicate = Workstation::where('ip_address', $request->ip_address)->whereNotNull('ip_address')->whereNotIn('id', [$id])->first();

        if($duplicate){
            return response()->json(true);
        }

        $work_station = Workstation::where('id', $id)->first();

        $work_station->ip_address = $request->ip_address;

        $work_station->save();

        $activity_type = ActivityType::where('type', 'work_station')->where('action', 'update')->first();

        $activity = new Activity;
        $activity->user_id = $request->user()->id;
        $activity->activity_type_id = $activity_type->id;
        $activity->event_id = $work_station->id;

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
        //
    }
}
