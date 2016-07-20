<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\AssetType;
use App\AssetTag;
use App\Activity;
use App\ActivityType;
use Auth;
use DB;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class AssetTypeController extends Controller
{
    public function checkAssetType(Request $request)
    {
        $asset_type = $request->id ? AssetType::whereNotIn('id', [$request->id])->where('type', $request->type)->first() : AssetType::where('type', $request->type)->first();

        return response()->json($asset_type ? true : false);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return AssetType::with('assets')->get();
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

        $duplicate = AssetType::where('type', $request->type)->first();

        if($duplicate)
        {
            return response()->json(true);
        }

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

        return;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $asset_type = AssetType::where('id', $id)->with('assets', 'asset_tags')->first();
        $asset_type->deployed = 0;
        $asset_type->pulled_out = 0;
        $asset_type->stocks = 0;

        foreach ($asset_type->asset_tags as $asset_tag_key => $asset_tag_value) {
            if(count($asset_tag_value->status)){
                $asset_type->pulled_out += 1;
            }
            else if(!count($asset_tag_value->status) && $asset_tag_value->work_station_id){
                $asset_type->deployed += 1;
            }
            else if(!count($asset_tag_value->status) && !$asset_tag_value->work_station_id){
                $asset_type->stocks += 1;
            }
        }

        $last = AssetTag::where('asset_type_id', $id)->orderBy('sequence', 'desc')->first();
        
        if($last)
        {
            $asset_type->last_property_code = $last->property_code;
        }

        return $asset_type;
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

        $duplicate = AssetType::whereNotIn('id', [$id])->where('type', $request->type)->first();

        if($duplicate)
        {
            return response()->json(true);
        }

        $asset_type = AssetType::with('assets', 'asset_tags')->where('id', $id)->first();

        $asset_type->type = ucfirst($request->type);
        $asset_type->prefix = strtoupper($request->prefix);

        $asset_type->save();

        foreach ($asset_type->asset_tags as $asset_tag_key => $asset_tag_value) {
            $asset_tag_value->prefix = $asset_type->prefix;

            if($asset_tag_value->sequence > 0 && $asset_tag_value->sequence < 10)
            {
                $fill = '0000';
            }
            else if($asset_tag_value->sequence > 9 && $asset_tag_value->sequence < 100)
            {
                $fill = '000';
            }
            else if($asset_tag_value->sequence > 99 && $asset_tag_value->sequence < 1000)
            {
                $fill = '00';
            }
            else if($asset_tag_value->sequence > 999 && $asset_tag_value->sequence < 10000)
            {
                $fill = '0';
            }
            else{
                $fill = null;
            }

            $asset_tag_value->property_code = $asset_type->prefix . $fill . $asset_tag_value->sequence;

            $asset_tag_value->save();
        } 

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
