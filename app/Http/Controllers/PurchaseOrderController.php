<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\PurchaseOrder;
use App\Activity;
use App\ActivityType;
use Auth;
use DB;
use Carbon\Carbon;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class PurchaseOrderController extends Controller
{
    public function search(Request $request)
    {
        $this->validate($request, [
            'searchText' => 'required|string',
        ]);

        return PurchaseOrder::with('vendor')->with(['asset_purchase_order' => function($query){ $query->with(['asset' => function($query){ $query->with('type'); }]); }])->where('id', $request->searchText)->get();
    }

    public function paginate()
    {
        return PurchaseOrder::with('vendor')->with(['asset_purchase_order' => function($query){ $query->with(['asset' => function($query){ $query->with('type'); }]); }])->orderBy('created_at', 'desc')->paginate(20);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return PurchaseOrder::with('vendor')->with(['asset_purchase_order' => function($query){ $query->with(['asset' => function($query){ $query->with('type'); }]); }])->orderBy('created_at', 'desc')->get();
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
            'vendor_id' => 'required',
            'date_purchased' => 'required',
            'date_arrival' => 'required',
        ]);

        $purchase_order = new PurchaseOrder;

        $purchase_order->vendor_id = $request->vendor_id;
        $purchase_order->tracking_code = $request->tracking_code ? $request->tracking_code : null;
        $purchase_order->date_purchased = Carbon::parse($request->date_purchased)->toDateTimeString();
        $purchase_order->date_arrival = Carbon::parse($request->date_arrival)->toDateTimeString();

        $purchase_order->save();

        $activity_type = ActivityType::where('type', 'purchase_order')->where('action', 'create')->first();

        $activity = new Activity;

        $activity->user_id = $request->user()->id;
        $activity->activity_type_id = $activity_type->id;
        $activity->event_id = $purchase_order->id;

        $activity->save();

        return $purchase_order;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $this->id = $id;
        // fetch purchase order with its vendor, asset_purchase_order, asset, 
        return PurchaseOrder::with('vendor')->with(['asset_purchase_order' => function($query){ $query->with(['asset' => function($query){ $query->with('type', 'details')->with(['asset_tags' => function($query){ $query->withTrashed()->with('work_station')->where('purchase_order_id', $this->id); } ]); }]); }])->where('id', $id)->first();
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
            'vendor_id' => 'required',
            'date_purchased' => 'required',
            'date_arrival' => 'required',
        ]);

        $purchase_order = PurchaseOrder::where('id', $id)->first();

        $purchase_order->vendor_id = $request->vendor_id;
        $purchase_order->tracking_code = $request->tracking_code ? $request->tracking_code : null;
        $purchase_order->date_purchased = Carbon::parse($request->date_purchased)->toDateTimeString();
        $purchase_order->date_arrival = Carbon::parse($request->date_arrival)->toDateTimeString();

        $purchase_order->save();

        $activity_type = ActivityType::where('type', 'purchase_order')->where('action', 'update')->first();

        $activity = new Activity;

        $activity->user_id = $request->user()->id;
        $activity->activity_type_id = $activity_type->id;
        $activity->event_id = $purchase_order->id;

        $activity->save();

        return $purchase_order;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $purchase_order = PurchaseOrder::where('id', $id)->first();

        $activity_type = ActivityType::where('type', 'purchase_order')->where('action', 'delete')->first();

        $activity = new Activity;

        $activity->user_id = Auth::user()->id;
        $activity->activity_type_id = $activity_type->id;
        $activity->event_id = $purchase_order->id;

        $activity->save();

        $purchase_order->delete();
    }
}
