<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Vendor;
use App\Activity;
use App\ActivityType;
use Auth;
use DB;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class VendorController extends Controller
{
    public function contactNumbers($id)
    {
        $vendor = Vendor::where('id', $id)->first();

        return Vendor::where('company', $vendor->company)->where('contact_person', $vendor->contact_person)->get();
    }
    public function contactPersons($id)
    {   
        $vendor = Vendor::where('id', $id)->first();

        return Vendor::where('company', $vendor->company)->groupBy('contact_person')->get();
    }
    public function distinct(Request $request)
    {
        return Vendor::groupBy($request->distinct)->get();
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Vendor::with('purchase_orders')->get();
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
            'company' => 'required',
            'contact_person' => 'required',
            'contact_number' => 'required',
        ]);

        $vendor = new Vendor;

        $vendor->company = $request->company;
        $vendor->contact_person = $request->contact_person;
        $vendor->contact_number = $request->contact_number;

        $vendor->save();

        $activity_type = ActivityType::where('type', 'vendor')->where('action', 'create')->first();
        
        $activity = new Activity;

        $activity->user_id = $request->user()->id;
        $activity->activity_type_id = $activity_type->id;
        $activity->event_id = $vendor->id;

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
        return Vendor::with('purchase_orders')->where('id', $id)->first();
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
            'company' => 'required',
            'contact_person' => 'required',
            'contact_number' => 'required',
        ]);

        $vendor = Vendor::where('id', $id)->first();

        $vendor->company = $request->company;
        $vendor->contact_person = $request->contact_person;
        $vendor->contact_number = $request->contact_number;

        $vendor->save();

        $activity_type = ActivityType::where('type', 'vendor')->where('action', 'update')->first();
        
        $activity = new Activity;

        $activity->user_id = $request->user()->id;
        $activity->activity_type_id = $activity_type->id;
        $activity->event_id = $vendor->id;

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
        $vendor = Vendor::where('id', $id)->first();

        $activity_type = ActivityType::where('type', 'vendor')->where('action', 'delete')->first();

        $activity = new Activity;

        $activity->user_id = Auth::user()->id;
        $activity->activity_type_id = $activity_type->id;
        $activity->event_id = $vendor->id;

        $activity->save();

        $vendor->delete();
    }
}
