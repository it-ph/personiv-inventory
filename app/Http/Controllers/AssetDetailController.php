<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\AssetDetail;
use App\Activity;
use App\ActivityType;
use Auth;
use DB;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class AssetDetailController extends Controller
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
                $i.'.label' => 'required',
                $i.'.value' => 'required',
            ]);

            $asset_detail = new AssetDetail;

            $asset_detail->asset_id = $request->input($i.'.asset_id');
            $asset_detail->label = $request->input($i.'.label');
            $asset_detail->value = $request->input($i.'.value');

            $asset_detail->save();
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
        $asset_details = AssetDetail::where('asset_id', $id)->delete();

        for ($i=0; $i < count($request->all()); $i++) { 
            $this->validate($request, [
                $i.'.asset_id' => 'required|numeric',
                $i.'.label' => 'required',
                $i.'.value' => 'required',
            ]);

            $asset_detail = new AssetDetail;

            $asset_detail->asset_id = $request->input($i.'.asset_id');
            $asset_detail->label = $request->input($i.'.label');
            $asset_detail->value = $request->input($i.'.value');

            $asset_detail->save();
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
