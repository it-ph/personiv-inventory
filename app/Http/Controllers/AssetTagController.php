<?php

namespace App\Http\Controllers;
use App\AssetTag;
use DB;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class AssetTagController extends Controller
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
        //
    }

    /**
     * Store multiple newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function storeMultiple(Request $request)
    {
        //loop through the number of items in request
        for ($i=0; $i < count($request->all()); $i++) { 
            if($request->input($i.'.hasComponent'))
            {
                //validate the request
                $this->validate($request, [
                    $i.'.component_id' => 'numeric',
                    $i.'.component_type' => 'required|string',
                    $i.'.work_station_id' => 'required|numeric',
                    $i.'.serial' => 'required|string',
                ]);

                //create a new instance of Skill per loop
                $asset_tag = new AssetTag;

                //define skill properties
                $asset_tag->component_id = $request->input($i.'.component_id');
                $asset_tag->component_type = $request->input($i.'.component_type');
                $asset_tag->work_station_id = $request->input($i.'.work_station_id');
                $asset_tag->serial = $request->input($i.'.serial');

                //save to database
                $asset_tag->save();
            }
        };
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
