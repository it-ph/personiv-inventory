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
    public function weeklyChart(Request $request)
    {
        $user = $request->user();

        $date_end = Carbon::parse('first Monday of this month')->addWeek();

        for ($date_start = Carbon::parse('first Monday of '. $request->month); $date_start->lt(Carbon::parse('first Monday of next month '. $request->month)); $date_start->addWeek())
        { 
            $week_range = $date_start->toFormattedDateString().' to '.$date_end->toFormattedDateString();
            array_push($user->week_ranges, $week_range);
            // Purchase Orders
            $purchase_orders_week = PurchaseOrder::whereBetween('created_at', [$date_start, $date_end])->count();
            array_push($user->purchase_order_array[0][0], $purchase_orders_week);
            
            // Asset Tags
            $asset_tags = AssetTag::with('status')->whereBetween('created_at', [$date_start, $date_end])->get();
            // array_push($asset_tags_weekly, [0,0,0]);

            $pulled_out_weekly = 0;
            $deployed_weekly = 0;
            $stock_weekly = 0;

            foreach ($asset_tags as $asset_tag_key => $asset_tag_value) {
                // Pulled Out
                if(count($asset_tag_value->status)){
                    $pulled_out_weekly += 1;
                }
                // Deployed
                else if(!count($asset_tag_value->status) && $asset_tag_value->work_station_id){
                    $deployed_weekly += 1;
                }
                // Stock
                else if(!count($asset_tag_value->status) && !$asset_tag_value->work_station_id){
                    $stock_weekly += 1;
                }
            }

            array_push($user->asset_tag_array[0][2], $pulled_out);
            array_push($user->asset_tag_array[0][0], $deployed);
            array_push($user->asset_tag_array[0][1], $stock);


            // Activities
            $activities = Activity::whereBetween('created_at', [$date_start, $date_end])->count();
            array_push($user->activity_array[0][0], $activities);

            $date_end->addWeek();
        }
    }

    public function dashboard()
    {
        $user = DB::table('users')->where('id', Auth::user()->id)->first();

        $months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        $user->purchase_order_array = array(array([]),array([]));
        $user->asset_tag_array = array(array([],[],[]),array([],[],[]));
        $user->activity_array = array(array([]),array([]));
        $user->week_ranges = array();

        // yearly
        foreach ($months as $month_key => $month_value) {
            $month_date_start = new Carbon('first Monday of '. $month_value);
            $month_date_end = new Carbon('first Monday of next month '. $month_value);

            // Purchase Orders
            $purchase_orders = PurchaseOrder::whereBetween('created_at', [$month_date_start, $month_date_end])->count();
            array_push($user->purchase_order_array[1][0], $purchase_orders);

            // Asset Tags
            $asset_tags = AssetTag::with('status')->whereBetween('created_at', [$month_date_start, $month_date_end])->get();

            $pulled_out = 0;
            $deployed = 0;
            $stock = 0;

            foreach ($asset_tags as $asset_tag_key => $asset_tag_value) {
                // Pulled Out
                if(count($asset_tag_value->status)){
                    $pulled_out += 1;
                }
                // Deployed
                else if(!count($asset_tag_value->status) && $asset_tag_value->work_station_id){
                    $deployed += 1;
                }
                // Stock
                else if(!count($asset_tag_value->status) && !$asset_tag_value->work_station_id){
                    $stock += 1;
                }
            }

            array_push($user->asset_tag_array[1][2], $pulled_out);
            array_push($user->asset_tag_array[1][0], $deployed);
            array_push($user->asset_tag_array[1][1], $stock);

            // Activities
            $activities = Activity::whereBetween('created_at', [$month_date_start, $month_date_end])->count();
            array_push($user->activity_array[1][0], $activities);            
        }

        $first_day = new Carbon('first Monday of this month');
        $last_day = new Carbon('first Monday of next month');

        $user->purchase_order_count = PurchaseOrder::whereBetween('created_at', [$first_day, $last_day])->count();
        $user->asset_tag_count = AssetTag::whereBetween('created_at', [$first_day, $last_day])->count();
        $user->activity_count = Activity::whereBetween('created_at', [$first_day, $last_day])->count();

        $user->warranty = AssetTag::with('asset')->with(['purchase_order' => function($query){ $query->with('vendor'); }])->whereBetween('warranty_end', [Carbon::parse('first day of this month'), Carbon::parse('last day of next month')])->get();

        return response()->json($user);
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
