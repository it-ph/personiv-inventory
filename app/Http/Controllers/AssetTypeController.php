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
        $asset_type = AssetType::where('id', $id)->with('assets')->first();
        $asset_type->deployed = 0;
        $asset_type->pulled_out = 0;
        $asset_type->stocks = 0;

        foreach ($asset_type->assets as $asset_key => $asset_value) {
            $asset_tags = AssetTag::where('asset_id', $asset_value->id)->with('status')->orderBy('created_at', 'desc')->get();

            foreach ($asset_tags as $asset_tag_key => $asset_tag_value) {
                $asset_type->last_property_code = $asset_tag_key == 0 ? $asset_tag_value->property_code : null;

                if(!$asset_tag_value->status->deleted_at){
                    $asset_type->pulled_out += 1;
                }
            }

            $deployed_count = AssetTag::where('asset_id', $asset_value->id)->whereNotNull('work_station_id')->count();
            $stock_count = AssetTag::where('asset_id', $asset_value->id)->whereNull('work_station_id')->count();

            $asset_type->deployed += $deployed_count;
            $asset_type->stocks += $stock_count;
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
