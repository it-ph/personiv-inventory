<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\InventoryReport;
use App\AssetType;
use App\PurchaseOrder;
use App\AssetTag;
use App\Activity;
use Auth;
use DB;
use Excel;
use Carbon\Carbon;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class InventoryReportController extends Controller
{
    public function dashboard()
    {
        $user = Auth::user();

        $date_start = new Carbon('first day of this month');
        $date_end = new Carbon('last day of this month');

        $user->purchase_order_count = PurchaseOrder::whereBetween('created_at', [$date_start, $date_end])->count();
        $user->asset_tag_count = AssetTag::whereBetween('created_at', [$date_start, $date_end])->count();
        $user->activity_count = Activity::whereBetween('created_at', [$date_start, $date_end])->count();

        return $user;
    }
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

        $this->data = AssetType::with(['assets' => function($query){ $query->with('details')->with(['asset_tags' => function($query){ $query->with('status', 'purchase_order', 'status', 'work_station'); }]); }])->get();

        Excel::create('Inventory Report as of '. Carbon::today()->toFormattedDateString(), function($excel){
            foreach ($this->data as $asset_type_key => $asset_type) {
                foreach ($asset_type->assets as $asset_key => $asset_value) {
                    $asset_value->deployed = 0;
                    $asset_value->pulled_out = 0;
                    $asset_value->stocks = 0;
                    
                    foreach ($asset_value->asset_tags as $asset_asset_tag_key => $asset_asset_tag_value) {
                        $asset_asset_tag_value->warranty_end = Carbon::parse($asset_asset_tag_value->warranty_end)->toFormattedDateString();
                        
                        if($asset_asset_tag_value->purchase_order){
                            $asset_asset_tag_value->purchase_order->date_purchased = Carbon::parse($asset_asset_tag_value->purchase_order->date_purchased)->toFormattedDateString();
                        }

                        if(count($asset_asset_tag_value->status)){
                            $asset_value->pulled_out += 1;
                            $asset_asset_tag_value->status = 'Pulled Out';
                        }
                        else if($asset_asset_tag_value->work_station_id)
                        {
                            $asset_value->deployed += 1;
                            $asset_asset_tag_value->status = 'Deployed';
                        }
                        else if(!$asset_asset_tag_value->work_station_id){
                            $asset_value->pulled_out += 1;
                            $asset_asset_tag_value->status = 'Stock';
                        }
                    }

                    $asset_value->total = $asset_value->deployed + $asset_value->pulled_out + $asset_value->stocks;
                }

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
