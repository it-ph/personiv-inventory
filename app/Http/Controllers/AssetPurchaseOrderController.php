<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\AssetPurchaseOrder;
use App\Activity;
use App\ActivityType;
use Auth;
use DB;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class AssetPurchaseOrderController extends Controller
{
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
        for ($i=0; $i < count($request->all()); $i++) { 
            $this->validate($request, [
                $i.'.asset_id' => 'required|numeric',
                $i.'.purchase_order_id' => 'required|numeric',
                $i.'.quantity' => 'required|numeric',
            ]);

            $asset_purchase_order = new AssetPurchaseOrder;

            $asset_purchase_order->asset_id = $request->input($i.'.asset_id');
            $asset_purchase_order->purchase_order_id = $request->input($i.'.purchase_order_id');
            $asset_purchase_order->quantity = $request->input($i.'.quantity');

            $asset_purchase_order->save();

            $activity_type = ActivityType::where('type', 'asset_purchase_order')->where('action', 'create')->first();

            $activity = new Activity;

            $activity->user_id = $request->user()->id;
            $activity->activity_type_id = $activity_type->id;
            $activity->event_id = $asset_purchase_order->id;

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
        AssetPurchaseOrder::where('purchase_order_id', $id)->delete();

        for ($i=0; $i < count($request->all()); $i++) { 
            $this->validate($request, [
                $i.'.asset_id' => 'required|numeric',
                $i.'.purchase_order_id' => 'required|numeric',
                $i.'.quantity' => 'required|numeric',
            ]);

            $asset_purchase_order = new AssetPurchaseOrder;

            $asset_purchase_order->asset_id = $request->input($i.'.asset_id');
            $asset_purchase_order->purchase_order_id = $request->input($i.'.purchase_order_id');
            $asset_purchase_order->quantity = $request->input($i.'.quantity');

            $asset_purchase_order->save();

            $activity_type = ActivityType::where('type', 'asset_purchase_order')->where('action', 'update')->first();

            $activity = new Activity;

            $activity->user_id = $request->user()->id;
            $activity->activity_type_id = $activity_type->id;
            $activity->event_id = $asset_purchase_order->id;

            $activity->save();
        }
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
