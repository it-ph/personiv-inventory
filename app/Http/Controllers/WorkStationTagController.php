<?php

namespace App\Http\Controllers;
use App\WorkStationTag;
use App\WorkStation;
use DB;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class WorkStationTagController extends Controller
{
    public function workstation($id)
    {
        return WorkStationTag::where('work_station_id', $id)->first();
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
            'department_id' => 'required|numeric',
            'work_station_id' => 'required|numeric',
        ]);

        // create a new instance of desktop
        $work_station_tag = new WorkStationTag;

        // assign its properties
        $work_station_tag->department_id = $request->department_id;
        $work_station_tag->work_station_id = $request->work_station_id;

        // save to database
        $work_station_tag->save();

        // fetch the workstation data
        $work_station = WorkStation::where('id', $request->work_station_id)->first();

        // update workstation to occupied
        $work_station->occupied = true;

        // update record
        $work_station->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
