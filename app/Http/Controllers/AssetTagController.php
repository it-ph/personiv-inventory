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
     * Search database for records
     *
     * @return \Illuminate\Http\Response
    */
    public function search(Request $request)
    {
        return DB::table('asset_tags')
            ->join($request->table_name, $request->table_name . '.id', '=', 'asset_tags.component_id')
            ->join('work_stations', 'work_stations.id', '=', 'asset_tags.work_station_id')
            ->select(
                '*',
                DB::raw('SUBSTRING(work_stations.name, 4, 1) as first_letter'),
                DB::raw('DATE_FORMAT(asset_tags.date_purchase, "%b. %d, %Y") as date_purchase'),
                'asset_tags.id as asset_tags_id',
                'work_stations.name as work_station_name'
            )
            ->where('asset_tags.component_id', $request->component_id)
            ->where('asset_tags.component_type', $request->component_type)
            ->orWhere('asset_tags.serial', 'like', '%'. $request->userInput .'%')
            ->orWhere('asset_tags.property_code', 'like', $request->property_code. $request->userInput .'%')
            ->orWhere('asset_tags.date_purchase', 'like', '%'. $request->userInput .'%')
            ->orWhere('asset_tags.supplier', 'like', '%'. $request->userInput .'%')
            ->groupBy('asset_tags.id')
            ->orderBy('asset_tags.updated_at', 'desc')
            ->get();
    }
    /**
     * Fetches paginated active units of the asset
     *
    */
    public function active_unit(Request $request)
    {
        // determine its component type
        if ($request->component_type == 'Desktop') { $table_name = 'desktops'; }
        else if ($request->component_type == 'Hard Disk') { $table_name = 'hard_disks'; }
        else if ($request->component_type == 'Headset') { $table_name = 'headsets'; }
        else if ($request->component_type == 'Keyboard') { $table_name = 'keyboards'; }
        else if ($request->component_type == 'Memory') { $table_name = 'memories'; }
        else if ($request->component_type == 'Monitor') { $table_name = 'monitors'; }
        else if ($request->component_type == 'Mouse') { $table_name = 'mice'; }
        else if ($request->component_type == 'Software') { $table_name = 'softwares'; }
        else if ($request->component_type == 'Uninterruptible Power Supply') { $table_name = 'uninterruptible_power_supplies'; }
        else if ($request->component_type == 'Video Card') { $table_name = 'video_cards'; }
        else if ($request->component_type == 'Other Component') { $table_name = 'other_components'; }

        $first_letter = $request->component_type == 'Software' ? '.name' : '.brand';

        // execute a query that will join the correct asset table
        return DB::table('asset_tags')
            ->join($table_name, $table_name.'.id', '=', 'asset_tags.component_id')
            ->join('work_stations', 'work_stations.id', '=', 'asset_tags.work_station_id')
            ->select(
                '*',
                DB::raw('SUBSTRING(work_stations.name, 4, 1) as first_letter'),
                DB::raw('DATE_FORMAT(asset_tags.date_purchase, "%b. %d, %Y") as date_purchase'),
                'asset_tags.id as asset_tags_id',
                'work_stations.name as work_station_name'
                )
            ->where('asset_tags.component_id', $request->component_id)
            ->where('asset_tags.component_type', $request->component_type)
            ->where('asset_tags.status', 'active')
            ->whereNull('asset_tags.deleted_at')
            ->paginate(25);
    }

    /**
     * Fetches paginated repair units of the asset
     *
    */
    public function repair_unit(Request $request)
    {
        // determine its component type
        if ($request->component_type == 'Desktop') { $table_name = 'desktops'; }
        else if ($request->component_type == 'Hard Disk') { $table_name = 'hard_disks'; }
        else if ($request->component_type == 'Headset') { $table_name = 'headsets'; }
        else if ($request->component_type == 'Keyboard') { $table_name = 'keyboards'; }
        else if ($request->component_type == 'Memory') { $table_name = 'memories'; }
        else if ($request->component_type == 'Monitor') { $table_name = 'monitors'; }
        else if ($request->component_type == 'Mouse') { $table_name = 'mice'; }
        else if ($request->component_type == 'Software') { $table_name = 'softwares'; }
        else if ($request->component_type == 'Uninterruptible Power Supply') { $table_name = 'uninterruptible_power_supplies'; }
        else if ($request->component_type == 'Video Card') { $table_name = 'video_cards'; }
        else if ($request->component_type == 'Other Component') { $table_name = 'other_components'; }

        $first_letter = $request->component_type == 'Software' ? '.name' : '.brand';

        // execute a query that will join the correct asset table
       return DB::table('asset_tags')
            ->join($table_name, $table_name.'.id', '=', 'asset_tags.component_id')
            ->join('work_stations', 'work_stations.id', '=', 'asset_tags.work_station_id')
            ->select(
                '*',
                DB::raw('SUBSTRING(work_stations.name, 4, 1) as first_letter'),
                DB::raw('DATE_FORMAT(asset_tags.date_purchase, "%b. %d, %Y") as date_purchase'),
                'asset_tags.id as asset_tags_id',
                'work_stations.name as work_station_name'
                )
            ->where('asset_tags.component_id', $request->component_id)
            ->where('asset_tags.component_type', $request->component_type)
            ->where('asset_tags.status', 'repair')
            ->whereNull('asset_tags.deleted_at')
            ->paginate(25);
    }
    /**
     * Fetches paginated dispose units of the asset
     *
    */
    public function dispose_unit(Request $request)
    {
        // determine its component type
        if ($request->component_type == 'Desktop') { $table_name = 'desktops'; }
        else if ($request->component_type == 'Hard Disk') { $table_name = 'hard_disks'; }
        else if ($request->component_type == 'Headset') { $table_name = 'headsets'; }
        else if ($request->component_type == 'Keyboard') { $table_name = 'keyboards'; }
        else if ($request->component_type == 'Memory') { $table_name = 'memories'; }
        else if ($request->component_type == 'Monitor') { $table_name = 'monitors'; }
        else if ($request->component_type == 'Mouse') { $table_name = 'mice'; }
        else if ($request->component_type == 'Software') { $table_name = 'softwares'; }
        else if ($request->component_type == 'Uninterruptible Power Supply') { $table_name = 'uninterruptible_power_supplies'; }
        else if ($request->component_type == 'Video Card') { $table_name = 'video_cards'; }
        else if ($request->component_type == 'Other Component') { $table_name = 'other_components'; }

        $first_letter = $request->component_type == 'Software' ? '.name' : '.brand';

        // execute a query that will join the correct asset table
        return DB::table('asset_tags')
            ->join($table_name, $table_name.'.id', '=', 'asset_tags.component_id')
            ->join('work_stations', 'work_stations.id', '=', 'asset_tags.work_station_id')
            ->select(
                '*',
                DB::raw('SUBSTRING(work_stations.name, 4, 1) as first_letter'),
                DB::raw('DATE_FORMAT(asset_tags.date_purchase, "%b. %d, %Y") as date_purchase'),
                'asset_tags.id as asset_tags_id',
                'work_stations.name as work_station_name'
                )
            ->where('asset_tags.component_id', $request->component_id)
            ->where('asset_tags.component_type', $request->component_type)
            ->where('asset_tags.status', 'dispose')
            ->whereNull('asset_tags.deleted_at')
            ->paginate(25);
    }

    /**
     * Set Asset Tag Status as dispose
     *
    */
    public function dispose($id)
    {
        $asset_tag = AssetTag::where('id', $id)->first();

        $asset_tag->status = 'dispose';

        $asset_tag->save();
    }

    /**
     * Set Asset Tag Status as repair
     *
    */
    public function repair($id)
    {
        $asset_tag = AssetTag::where('id', $id)->first();

        $asset_tag->status = 'repair';

        $asset_tag->save();
    }

    /**
     * Transfer a components of the work station
     * Returns array of object
     *
    */
    public function transfer(Request $request, $id)
    {
        $this->validate($request, [
            'work_station_id' => 'required|numeric',
        ]);

        $asset_tag = AssetTag::where('id', $id)->first();

        $asset_tag->work_station_id = $request->workStationID;

        $asset_tag->save();
    }

    /**
     * Fetch specific component of the work station and returns a joined information with the corresponding asset
     * Returns object
     *
     */
    public function specific($id)
    {
        // fetch the specific asset tag
        $asset_tag = AssetTag::where('id', $id)->first();

        // determine its component type
        if ($asset_tag->component_type == 'Desktop') { $table_name = 'desktops'; }
        else if ($asset_tag->component_type == 'Hard Disk') { $table_name = 'hard_disks'; }
        else if ($asset_tag->component_type == 'Headset') { $table_name = 'headsets'; }
        else if ($asset_tag->component_type == 'Keyboard') { $table_name = 'keyboards'; }
        else if ($asset_tag->component_type == 'Memory') { $table_name = 'memories'; }
        else if ($asset_tag->component_type == 'Monitor') { $table_name = 'monitors'; }
        else if ($asset_tag->component_type == 'Mouse') { $table_name = 'mice'; }
        else if ($asset_tag->component_type == 'Software') { $table_name = 'softwares'; }
        else if ($asset_tag->component_type == 'Uninterruptible Power Supply') { $table_name = 'uninterruptible_power_supplies'; }
        else if ($asset_tag->component_type == 'Video Card') { $table_name = 'video_cards'; }
        else if ($asset_tag->component_type == 'Other Component') { $table_name = 'other_components'; }

        $first_letter = $asset_tag->component_type == 'Software' ? '.name' : '.brand';

        // execute a query that will join the correct asset table
        $asset = DB::table('asset_tags')
            ->join($table_name, $table_name.'.id', '=', 'asset_tags.component_id')
            ->select(
                '*',
                DB::raw('LEFT('. $table_name . $first_letter .', 1) as first_letter'),
                'asset_tags.id as asset_tags_id'
                )
            ->where('asset_tags.id', $id)
            ->first();

        return response()->json($asset);
    }

    /**
     * Fetches all components of the work station and returns a joined information with the corresponding asset
     * Returns array of object
     *
     */
    public function workStation($work_station_id)
    {
        // fetch all components of the work station
        $assets = AssetTag::where('work_station_id', $work_station_id)->where('status', 'active')->orderBy('component_type')->get();

        // create a custom array to contain the response data
        $asset_array = array();

        // create a join statement that will fetch its details
        foreach ($assets as $key => $value) {
            $type = $value->component_type;

            if ($type == 'Desktop') { $table_name = 'desktops'; }
            else if ($type == 'Hard Disk') { $table_name = 'hard_disks'; }
            else if ($type == 'Headset') { $table_name = 'headsets'; }
            else if ($type == 'Keyboard') { $table_name = 'keyboards'; }
            else if ($type == 'Memory') { $table_name = 'memories'; }
            else if ($type == 'Monitor') { $table_name = 'monitors'; }
            else if ($type == 'Mouse') { $table_name = 'mice'; }
            else if ($type == 'Software') { $table_name = 'softwares'; }
            else if ($type == 'Uninterruptible Power Supply') { $table_name = 'uninterruptible_power_supplies'; }
            else if ($type == 'Video Card') { $table_name = 'video_cards'; }
            else if ($type == 'Other Component') { $table_name = 'other_components'; }

            $first_letter = $type == 'Software' ? '.name' : '.brand';

            $query = DB::table('asset_tags')
                ->join($table_name, $table_name.'.id', '=', 'asset_tags.component_id')
                ->select(
                    '*',
                    'asset_tags.id as asset_tags_id',
                    DB::raw('LEFT('. $table_name . $first_letter .', 1) as first_letter'),
                    DB::raw('DATE_FORMAT(asset_tags.date_purchase, "%b. %d, %Y") as date_purchase')
                    )
                ->where('asset_tags.id', $value->id)
                ->get();

            // push each results to custom array
            foreach ($query as $key => $value) {
                array_push($asset_array, $value);
            }
        }

        return response()->json($asset_array);
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
            //validate the request
            $this->validate($request, [
                $i.'.component_id' => 'numeric',
                $i.'.component_type' => 'required|string',
                $i.'.work_station_id' => 'required|numeric',
                $i.'.serial' => 'string',
                $i.'.property_code' => 'required|string',
                $i.'.date_purchase' => 'date',
                $i.'.supplier' => 'string',
            ]);

            //create a new instance of Skill per loop
            $asset_tag = new AssetTag;

            //define skill properties
            $asset_tag->component_id = $request->input($i.'.component_id');
            $asset_tag->component_type = $request->input($i.'.component_type');
            $asset_tag->work_station_id = $request->input($i.'.work_station_id');
            $asset_tag->serial = $request->input($i.'.serial');
            $asset_tag->property_code = $request->input($i.'.property_code');
            $asset_tag->status = 'active';
            $asset_tag->date_purchase = $request->input($i.'.date_purchase') ? $request->input($i.'.date_purchase') : null;
            $asset_tag->supplier = $request->input($i.'.supplier') ? $request->input($i.'.supplier') : null;

            //save to database
            $asset_tag->save();
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
        $this->validate($request, [
            'date_purchase' => 'date',
            'supplier' => 'string',
        ]);

        $asset_tag = AssetTag::where('id', $id)->first();

        $asset_tag->date_purchase = $request->date_purchase ? $request->date_purchase : null; 
        $asset_tag->supplier = $request->supplier ? $request->supplier : null;

        $asset_tag->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return AssetTag::where('id', $id)->delete();
    }
}
