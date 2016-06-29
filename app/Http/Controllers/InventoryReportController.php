<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\InventoryReport;
use App\AssetType;
use Auth;
use DB;
use Excel;
use Carbon\Carbon;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class InventoryReportController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();

        $report = new InventoryReport;

        $report->user_id = $user->id;
        $report->save();

        $this->data = AssetType::with(['assets' => function($query){ $query->with('details'); }])->with(['asset_tags' => function($query){ $query->with('asset', 'purchase_order', 'status', 'work_station'); }])->get();

        // return $this->data;

        Excel::create('Inventory Report as of '. Carbon::today()->toFormattedDateString(), function($excel){
            foreach ($this->data as $asset_type_key => $asset_type) {
                $this->asset_type = $asset_type;
                $excel->sheet($asset_type->type, function($sheet){
                    $sheet->loadView('excel.inventory-report')->with('data', $this->asset_type);
                });
            }
        })->download('xls');
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
