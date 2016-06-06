<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\AssetType;
use App\Activity;
use App\ActivityType;
use Auth;
use DB;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class AssetTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return AssetType::all();
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
            'type' => 'required|string',
            'prefix' => 'required',
        ]);

        $asset_type = new AssetType;

        $asset_type->type = ucfirst($request->type);
        $asset_type->prefix = strtoupper($request->prefix);

        $asset_type->save();

        // Search the activity type
        $activity_type = ActivityType::where('type', 'asset_type')->where('action', 'create')->first();

        // create an activity log
        $activity = new Activity;

        $activity->user_id = $request->user()->id;
        $activity->activity_type_id = $activity_type->id;
        $activity->event_id = $asset_type->id;

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
        return AssetType::where('id', $id)->first();
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
            'type' => 'required|string',
            'prefix' => 'required',
        ]);

        $asset_type = AssetType::where('id', $id)->first();

        $asset_type->type = ucfirst($request->type);
        $asset_type->prefix = strtoupper($request->prefix);

        $asset_type->save();

        // Search the activity type
        $activity_type = ActivityType::where('type', 'asset_type')->where('action', 'update')->first();

        // create an activity log
        $activity = new Activity;

        $activity->user_id = $request->user()->id;
        $activity->activity_type_id = $activity_type->id;
        $activity->event_id = $asset_type->id;

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
        $asset_type = AssetType::where('id', $id)->first();
        
        // Search the activity type
        $activity_type = ActivityType::where('type', 'asset_type')->where('action', 'delete')->first();

        // create an activity log
        $activity = new Activity;

        $activity->user_id = Auth::user()->id;
        $activity->activity_type_id = $activity_type->id;
        $activity->event_id = $asset_type->id;

        $activity->save();

        $asset_type->delete();
    }
}
