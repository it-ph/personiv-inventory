<?php

namespace App\Http\Controllers;
use App\AssetTag;
use DB;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class AssetTagController extends Controller
{
    public function workStation($work_station_id)
    {
        // fetch all components of the work station
        $assets = AssetTag::where('work_station_id', $work_station_id)->get();

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
     * Fetch asset tag by component type and id.
     *
     * @return \Illuminate\Http\Response
     */
    public function componentType(Request $request)
    {
        $first_letter = $request->table_name == 'softwares' ? '.name' : '.brand';
        return DB::table('asset_tags')
            ->join($request->table_name, $request->table_name.'.id', '=', 'asset_tags.component_id')
            ->select(
                '*',
                'asset_tags.id as asset_tags_id',
                DB::raw('LEFT('. $request->table_name . $first_letter .', 1) as first_letter'),
                DB::raw('DATE_FORMAT(asset_tags.date_purchase, "%b. %d, %Y") as date_purchase')
                )
            ->where('asset_tags.work_station_id', $request->work_station_id)
            ->where('asset_tags.component_type', $request->component_type)
            ->get();
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
                $i.'.serial' => 'required|string',
                $i.'.date_purchase' => 'required|date',
                $i.'.supplier' => 'required|string',
            ]);

            //create a new instance of Skill per loop
            $asset_tag = new AssetTag;

            //define skill properties
            $asset_tag->component_id = $request->input($i.'.component_id');
            $asset_tag->component_type = $request->input($i.'.component_type');
            $asset_tag->work_station_id = $request->input($i.'.work_station_id');
            $asset_tag->serial = $request->input($i.'.serial');
            $asset_tag->date_purchase = $request->input($i.'.date_purchase');
            $asset_tag->supplier = $request->input($i.'.supplier');

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
