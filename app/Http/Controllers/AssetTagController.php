<?php

namespace App\Http\Controllers;
use App\AssetTag;
use App\Asset;
use App\Activity;
use App\ActivityType;
use App\Log;
use Auth;
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class AssetTagController extends Controller
{
    public function repair($id)
    {
        $asset_tag = AssetTag::with('status')->where('id', $id)->first();

        foreach ($asset_tag->status as $key => $status) {
            $status->delete();
        }

        $asset_tag->work_station_id = null;

        $asset_tag->save();
    }

    public function search(Request $request)
    {
        $this->validate($request, [
            'searchText' => 'required|string',
        ]);

        return AssetTag::with('type', 'asset', 'purchase_order', 'status', 'work_station')->where('property_code', 'like', '%'. $request->searchText .'%')->orWhere('serial', 'like', '%'. $request->searchText .'%')->orWhere('computer_name', 'like', '%'. $request->searchText .'%')->first();
    }

    public function paginate($id)
    {
        return AssetTag::with('type', 'asset', 'purchase_order', 'status', 'work_station')->where('asset_type_id', $id)->paginate(20);
    }
    public function checkSequence(Request $request)
    {
        // fetches the asset
        $asset = Asset::where('id', $request->asset_id)->first();

        if($asset){
            // see if there is an asset tag with the same type and sequence of the asset
            $duplicate = $request->id ? AssetTag::withTrashed()->where('asset_type_id', $asset->asset_type_id)->where('sequence', $request->sequence)->whereNotIn('id', [$request->id])->first() : AssetTag::withTrashed()->where('asset_type_id', $asset->asset_type_id)->where('sequence', $request->sequence)->first();

            return response()->json($duplicate ? true: false);
        }
    }


    public function swap(Request $request, $id)
    {
        $this->validate($request, [
            'id' => 'required|numeric',
        ]);

        // for swap
        $asset_tag = AssetTag::where('id', $id)->first();
        // swap target
        $asset_tag_swap = AssetTag::where('id', $request->id)->first();
        // change the work station id of the for swap item
        $asset_tag->work_station_id = $asset_tag_swap->work_station_id;
        // for swap 2
        $asset_tag_2 = AssetTag::where('id', $id)->first();
        // change the work station id of the swap target
        $asset_tag_swap->work_station_id = $asset_tag_2->work_station_id;

        $asset_tag->save();
        $asset_tag_swap->save();

        $activity_type = ActivityType::where('type', 'asset_tag')->where('action', 'swap')->first();

        $activity = new Activity;

        $activity->user_id = $request->user()->id;
        $activity->activity_type_id = $activity_type->id;
        $activity->event_id = $asset_tag->id;

        $activity->save();
    }
    public function checkSwap(Request $request)
    {
        $this->validate($request, [
            'work_station_id' => 'required',
            'asset_type_id' => 'required',
        ]);

        $asset_tag = AssetTag::with(['asset'=> function($query){ $query->with('details'); }, 'work_station'])->where('asset_type_id', $request->asset_type_id)->where('work_station_id', $request->work_station_id)->first();

        return $asset_tag;
    }

    /**
     * Transfer a components of the work station
     * Returns array of object
     *
    */
    public function transfer(Request $request, $id)
    {
        $this->validate($request, [
            'work_station_id' => 'required',
        ]);

        $asset_tag = AssetTag::where('id', $id)->first();

        $asset_tag->work_station_id = $request->work_station_id;

        $asset_tag->save();

        $activity_type = ActivityType::where('type', 'asset_tag')->where('action', 'transfer')->first();

        $activity = new Activity;

        $activity->user_id = $request->user()->id;
        $activity->activity_type_id = $activity_type->id;
        $activity->event_id = $asset_tag->id;

        $activity->save();
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
            'asset_id' => 'required|numeric',
            'sequence' => 'required|numeric',
        ]);

        // fetches the asset
        $asset = Asset::with('type')->where('id', $request->asset_id)->first();

        if($asset){
            // see if there is an asset tag with the same type and sequence of the asset
            $duplicate = AssetTag::withTrashed()->where('asset_type_id', $asset->asset_type_id)->where('sequence', $request->sequence)->first();

            if($duplicate){
                return response()->json(true);
            }
        }

        if($request->sequence < 10)
        {
            $filler = '0000';
        }
        else if($request->sequence >= 10 && $request->sequence < 100)
        {
            $filler = '000';
        }
        else if($request->sequence >= 100 && $request->sequence < 1000)
        {
            $filler = '00';
        }
        else if($request->sequence >= 1000 && $request->sequence < 10000)
        {
            $filler = '0';
        }

        $asset_tag = new AssetTag;

        $asset_tag->asset_type_id = $asset->asset_type_id;
        $asset_tag->asset_id = $request->asset_id;
        $asset_tag->work_station_id = $request->work_station_id;
        $asset_tag->computer_name = $request->computer_name;
        $asset_tag->serial = $request->serial;
        $asset_tag->prefix = $asset->type->prefix;
        $asset_tag->sequence = $request->sequence;
        $asset_tag->property_code = $asset->type->prefix . $filler . $request->sequence;
        $asset_tag->remarks = $request->remarks;
        $asset_tag->warranty_end = $request->warranty_end ? Carbon::parse($request->warranty_end)->toDateTimeString() : null;

        $asset_tag->save();

        $activity_type = ActivityType::where('type', 'asset_tag')->where('action', 'create')->first();

        $activity = new Activity;

        $activity->user_id = $request->user()->id;
        $activity->activity_type_id = $activity_type->id;
        $activity->event_id = $asset_tag->id;

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
        return AssetTag::with('asset', 'type', 'work_station')->where('id', $id)->first();
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
            'asset_id' => 'required|numeric',
            'sequence' => 'required|numeric',
        ]);

        // fetches the asset
        $asset = Asset::withTrashed()->with('type')->where('id', $request->asset_id)->first();

        if($asset){
            // see if there is an asset tag with the same type and sequence of the asset
            $duplicate = AssetTag::where('asset_type_id', $asset->asset_type_id)->where('sequence', $request->sequence)->whereNotIn('id', [$id])->first();

            if($duplicate){
                return response()->json(true);
            }
        }

        if($request->sequence < 10)
        {
            $filler = '0000';
        }
        else if($request->sequence >= 10 && $request->sequence < 100)
        {
            $filler = '000';
        }
        else if($request->sequence >= 100 && $request->sequence < 1000)
        {
            $filler = '00';
        }
        else if($request->sequence >= 1000 && $request->sequence < 10000)
        {
            $filler = '0';
        }

        $asset_tag = AssetTag::where('id', $id)->first();

        $asset_tag->computer_name = $request->computer_name;
        $asset_tag->serial = $request->serial;
        $asset_tag->sequence = $request->sequence;
        $asset_tag->property_code = $asset->type->prefix . $filler . $request->sequence;
        $asset_tag->remarks = $request->remarks;
        $asset_tag->warranty_end = $request->warranty_end ? Carbon::parse($request->warranty_end)->toDateTimeString() : null;

        $asset_tag->save();

        $activity_type = ActivityType::where('type', 'asset_tag')->where('action', 'update')->first();

        $activity = new Activity;

        $activity->user_id = $request->user()->id;
        $activity->activity_type_id = $activity_type->id;
        $activity->event_id = $asset_tag->id;

        $activity->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $asset_tag = AssetTag::where('id', $id)->first();

        $activity_type = ActivityType::where('type', 'asset_tag')->where('action', 'delete')->first();

        $activity = new Activity;

        $activity->user_id = $request->user()->id;
        $activity->activity_type_id = $activity_type->id;
        $activity->event_id = $activity_type->id;

        $activity->save();

        $asset_tag->delete();
    }
}
