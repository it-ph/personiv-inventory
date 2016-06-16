<?php

namespace App\Http\Controllers;
use App\AssetTag;
use App\Asset;
use App\Activity;
use App\ActivityType;
use App\Log;
use Auth;
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class AssetTagController extends Controller
{
    public function checkSequence(Request $request)
    {
        // fetches the asset
        $asset = Asset::where('id', $request->asset_id)->first();

        if($asset){
            // see if there is an asset tag with the same type and sequence of the asset
            $duplicate = AssetTag::where('asset_type_id', $asset->asset_type_id)->where('sequence', $request->sequence)->first();

            return response()->json($duplicate ? true: false);
        }
    }


    public function swap(Request $request, $id)
    {
        $this->validate($request, [
            'asset_tag_id' => 'required',
        ]);

        // for swap
        $asset_tag = AssetTag::where('id', $id)->first();
        // swap target
        $asset_tag_swap = AssetTag::where('id', $request->asset_tag_id)->first();
        // change the work station id of the for swap item
        $asset_tag->work_station_id = $asset_tag_swap->work_station_id;
        // for swap 2
        $asset_tag_2 = AssetTag::where('id', $id)->first();
        // change the work station id of the swap target
        $asset_tag_swap->work_station_id = $asset_tag_2->work_station_id;

        $asset_tag->save();
        $asset_tag_swap->save();

        return $asset_tag->work_station_id;

    }
    public function availableSwap(Request $request)
    {
        $this->validate($request, [
            'work_station_id' => 'required'
        ]);

        return DB::table('asset_tags')
            ->where('work_station_id', $request->work_station_id)
            ->where('component_type', $request->component_type)
            ->get();
    }

    public function searchBarcode(Request $request)
    {
        if(substr($request->userInput, 1, 3) == 'CPU') { $table_name = 'desktops'; }
        else if (substr($request->userInput, 1, 3) == 'FWL') { $table_name = 'firewalls'; }
        else if (substr($request->userInput, 1, 3) == 'HDD') { $table_name = 'hard_disks'; }
        else if (substr($request->userInput, 1, 3) == 'HDS') { $table_name = 'headsets'; }
        else if (substr($request->userInput, 1, 3) == 'KBD') { $table_name = 'keyboards'; }
        else if (substr($request->userInput, 1, 3) == 'MAC') { $table_name = 'macs'; }
        else if (substr($request->userInput, 1, 3) == 'RAM') { $table_name = 'memories'; }
        else if (substr($request->userInput, 1, 3) == 'MON') { $table_name = 'monitors'; }
        else if (substr($request->userInput, 1, 3) == 'MSE') { $table_name = 'mice'; }
        else if (substr($request->userInput, 1, 3) == 'NSW') { $table_name = 'network_switches'; }
        else if (substr($request->userInput, 1, 3) == 'PHD') { $table_name = 'portable_hard_disks'; }
        else if (substr($request->userInput, 1, 3) == 'PRT') { $table_name = 'printers'; }
        else if (substr($request->userInput, 1, 3) == 'PRJ') { $table_name = 'projectors'; }
        else if (substr($request->userInput, 1, 3) == 'RTR') { $table_name = 'routers'; }
        else if (substr($request->userInput, 1, 3) == 'SCN') { $table_name = 'scanners'; }
        else if (substr($request->userInput, 1, 3) == 'SFW') { $table_name = 'softwares'; }
        else if (substr($request->userInput, 1, 3) == 'SPK') { $table_name = 'speakers'; }
        else if (substr($request->userInput, 1, 3) == 'TEL') { $table_name = 'telephones'; }
        else if (substr($request->userInput, 1, 3) == 'UPS') { $table_name = 'uninterruptible_power_supplies'; }
        else if (substr($request->userInput, 1, 3) == 'VDC') { $table_name = 'video_cards'; }
        else if (substr($request->userInput, 1, 3) == 'OTH') { $table_name = 'other_components'; } 

        $query = DB::table('asset_tags')
            ->join($table_name, $table_name . '.id', '=', 'asset_tags.component_id')
            ->join('work_stations', 'work_stations.id', '=', 'asset_tags.work_station_id')
            ->join('work_station_tags', 'work_station_tags.work_station_id', '=', 'work_stations.id')
            ->select(
                'asset_tags.*',
                $table_name. '.*',
                DB::raw('SUBSTRING(work_stations.name, 5, 1) as first_letter'),
                DB::raw('DATE_FORMAT(asset_tags.date_purchase, "%b. %d, %Y") as date_purchase'),
                'asset_tags.id as asset_tags_id',
                'work_stations.name as work_station_name',
                'work_stations.type as work_station_type',
                'work_station_tags.department_id'
            )
            ->where('asset_tags.property_code', $request->userInput)
            ->first();

        return response()->json($query);
    }

    public function swapComponents($workStationID, $swapWorkStationID)
    {
        $hard_disk = AssetTag::where('component_type', 'Hard Disk')->where('work_station_id', $workStationID)->get();
        $memory = AssetTag::where('component_type', 'Memory')->where('work_station_id', $workStationID)->get();
        $software = AssetTag::where('component_type', 'Software')->where('work_station_id', $workStationID)->get();
        $video_card = AssetTag::where('component_type', 'Video Card')->where('work_station_id', $workStationID)->get();

        $hard_disk_swap = AssetTag::where('component_type', 'Hard Disk')->where('work_station_id', $swapWorkStationID)->get();
        $memory_swap = AssetTag::where('component_type', 'Memory')->where('work_station_id', $swapWorkStationID)->get();
        $software_swap = AssetTag::where('component_type', 'Software')->where('work_station_id', $swapWorkStationID)->get();
        $video_card_swap = AssetTag::where('component_type', 'Video Card')->where('work_station_id', $swapWorkStationID)->get();

        foreach ($hard_disk as $key => $value) {
            $value->work_station_id = $swapWorkStationID;
            $value->save();
        }
        foreach ($memory as $key => $value) {
            $value->work_station_id = $swapWorkStationID;
            $value->save();
        }
        foreach ($software as $key => $value) {
            $value->work_station_id = $swapWorkStationID;
            $value->save();
        }
        foreach ($video_card as $key => $value) {
            $value->work_station_id = $swapWorkStationID;
            $value->save();
        }

        foreach ($hard_disk_swap as $key => $value) {
            $value->work_station_id = $workStationID;
            $value->save();
        }
        foreach ($memory_swap as $key => $value) {
            $value->work_station_id = $workStationID;
            $value->save();
        }
        foreach ($software_swap as $key => $value) {
            $value->work_station_id = $workStationID;
            $value->save();
        }
        foreach ($video_card_swap as $key => $value) {
            $value->work_station_id = $workStationID;
            $value->save();
        }
    }

    public function transferComponents(Request $request, $workStationID)
    {
        $hard_disk = AssetTag::where('component_type', 'Hard Disk')->where('work_station_id', $workStationID)->get();
        $memory = AssetTag::where('component_type', 'Memory')->where('work_station_id', $workStationID)->get();
        $software = AssetTag::where('component_type', 'Software')->where('work_station_id', $workStationID)->get();
        $video_card = AssetTag::where('component_type', 'Video Card')->where('work_station_id', $workStationID)->get();

        foreach ($hard_disk as $key => $value) {
            $value->work_station_id = $request->work_station_id;
            $value->save();
        }
        foreach ($memory as $key => $value) {
            $value->work_station_id = $request->work_station_id;
            $value->save();
        }
        foreach ($software as $key => $value) {
            $value->work_station_id = $request->work_station_id;
            $value->save();
        }
        foreach ($video_card as $key => $value) {
            $value->work_station_id = $request->work_station_id;
            $value->save();
        }
    }

    public function repairComponents($workStationID)
    {
        $hard_disk = AssetTag::where('component_type', 'Hard Disk')->where('work_station_id', $workStationID)->get();
        $memory = AssetTag::where('component_type', 'Memory')->where('work_station_id', $workStationID)->get();
        $software = AssetTag::where('component_type', 'Software')->where('work_station_id', $workStationID)->get();
        $video_card = AssetTag::where('component_type', 'Video Card')->where('work_station_id', $workStationID)->get();

        foreach ($hard_disk as $key => $value) {
            $value->status = 'repair';
            $value->save();
        }
        foreach ($memory as $key => $value) {
            $value->status = 'repair';
            $value->save();
        }
        foreach ($software as $key => $value) {
            $value->status = 'repair';
            $value->save();
        }
        foreach ($video_card as $key => $value) {
            $value->status = 'repair';
            $value->save();
        }
    }

    public function disposeComponents($workStationID)
    {
        $hard_disk = AssetTag::where('component_type', 'Hard Disk')->where('work_station_id', $workStationID)->get();
        $memory = AssetTag::where('component_type', 'Memory')->where('work_station_id', $workStationID)->get();
        $software = AssetTag::where('component_type', 'Software')->where('work_station_id', $workStationID)->get();
        $video_card = AssetTag::where('component_type', 'Video Card')->where('work_station_id', $workStationID)->get();

        foreach ($hard_disk as $key => $value) {
            $value->status = 'dispose';
            $value->save();
        }
        foreach ($memory as $key => $value) {
            $value->status = 'dispose';
            $value->save();
        }
        foreach ($software as $key => $value) {
            $value->status = 'dispose';
            $value->save();
        }
        foreach ($video_card as $key => $value) {
            $value->status = 'dispose';
            $value->save();
        }
    }

    public function activeComponents($workStationID)
    {
        $hard_disk = AssetTag::where('component_type', 'Hard Disk')->where('work_station_id', $workStationID)->get();
        $memory = AssetTag::where('component_type', 'Memory')->where('work_station_id', $workStationID)->get();
        $software = AssetTag::where('component_type', 'Software')->where('work_station_id', $workStationID)->get();
        $video_card = AssetTag::where('component_type', 'Video Card')->where('work_station_id', $workStationID)->get();

        foreach ($hard_disk as $key => $value) {
            $value->status = 'active';
            $value->save();
        }
        foreach ($memory as $key => $value) {
            $value->status = 'active';
            $value->save();
        }
        foreach ($software as $key => $value) {
            $value->status = 'active';
            $value->save();
        }
        foreach ($video_card as $key => $value) {
            $value->status = 'active';
            $value->save();
        }
    }
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
                DB::raw('SUBSTRING(work_stations.name, 5, 1) as first_letter'),
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
        else if ($request->component_type == 'Firewall') { $table_name = 'firewalls'; }
        else if ($request->component_type == 'Hard Disk') { $table_name = 'hard_disks'; }
        else if ($request->component_type == 'Headset') { $table_name = 'headsets'; }
        else if ($request->component_type == 'Keyboard') { $table_name = 'keyboards'; }
        else if ($request->component_type == 'Mac') { $table_name = 'macs'; }
        else if ($request->component_type == 'Memory') { $table_name = 'memories'; }
        else if ($request->component_type == 'Monitor') { $table_name = 'monitors'; }
        else if ($request->component_type == 'Mouse') { $table_name = 'mice'; }
        else if ($request->component_type == 'Network Switch') { $table_name = 'network_switches'; }
        else if ($request->component_type == 'Portable Hard Disk') { $table_name = 'portable_hard_disks'; }
        else if ($request->component_type == 'Printer') { $table_name = 'printers'; }
        else if ($request->component_type == 'Projector') { $table_name = 'projectors'; }
        else if ($request->component_type == 'Router') { $table_name = 'routers'; }
        else if ($request->component_type == 'Scanner') { $table_name = 'scanners'; }
        else if ($request->component_type == 'Software') { $table_name = 'softwares'; }
        else if ($request->component_type == 'Speaker') { $table_name = 'speakers'; }
        else if ($request->component_type == 'Telephone') { $table_name = 'telephones'; }
        else if ($request->component_type == 'Uninterruptible Power Supply') { $table_name = 'uninterruptible_power_supplies'; }
        else if ($request->component_type == 'Video Card') { $table_name = 'video_cards'; }
        else if ($request->component_type == 'Other Component') { $table_name = 'other_components'; }

        $first_letter = $request->component_type == 'Software' ? '.name' : '.brand';

        // execute a query that will join the correct asset table
        return DB::table('asset_tags')
            ->join($table_name, $table_name.'.id', '=', 'asset_tags.component_id')
            ->join('work_stations', 'work_stations.id', '=', 'asset_tags.work_station_id')
            ->join('work_station_tags', 'work_station_tags.work_station_id', '=', 'work_stations.id')
            ->select(
                '*',
                'asset_tags.id as asset_tag_id',
                DB::raw('SUBSTRING(work_stations.name, 5, 1) as first_letter'),
                DB::raw('DATE_FORMAT(asset_tags.date_purchase, "%b. %d, %Y") as date_purchase'),
                'work_stations.id as work_station_id',
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
        else if ($request->component_type == 'Firewall') { $table_name = 'firewalls'; }
        else if ($request->component_type == 'Hard Disk') { $table_name = 'hard_disks'; }
        else if ($request->component_type == 'Headset') { $table_name = 'headsets'; }
        else if ($request->component_type == 'Keyboard') { $table_name = 'keyboards'; }
        else if ($request->component_type == 'Mac') { $table_name = 'macs'; }
        else if ($request->component_type == 'Memory') { $table_name = 'memories'; }
        else if ($request->component_type == 'Monitor') { $table_name = 'monitors'; }
        else if ($request->component_type == 'Mouse') { $table_name = 'mice'; }
        else if ($request->component_type == 'Network Switch') { $table_name = 'network_switches'; }
        else if ($request->component_type == 'Portable Hard Disk') { $table_name = 'portable_hard_disks'; }
        else if ($request->component_type == 'Printer') { $table_name = 'printers'; }
        else if ($request->component_type == 'Projector') { $table_name = 'projectors'; }
        else if ($request->component_type == 'Router') { $table_name = 'routers'; }
        else if ($request->component_type == 'Scanner') { $table_name = 'scanners'; }
        else if ($request->component_type == 'Software') { $table_name = 'softwares'; }
        else if ($request->component_type == 'Speaker') { $table_name = 'speakers'; }
        else if ($request->component_type == 'Telephone') { $table_name = 'telephones'; }
        else if ($request->component_type == 'Uninterruptible Power Supply') { $table_name = 'uninterruptible_power_supplies'; }
        else if ($request->component_type == 'Video Card') { $table_name = 'video_cards'; }
        else if ($request->component_type == 'Other Component') { $table_name = 'other_components'; }

        $first_letter = $request->component_type == 'Software' ? '.name' : '.brand';

        // execute a query that will join the correct asset table
       return DB::table('asset_tags')
            ->join($table_name, $table_name.'.id', '=', 'asset_tags.component_id')
            ->join('work_stations', 'work_stations.id', '=', 'asset_tags.work_station_id')
            ->join('work_station_tags', 'work_station_tags.work_station_id', '=', 'work_stations.id')
            ->select(
                '*',
                'asset_tags.id as asset_tag_id',
                DB::raw('SUBSTRING(work_stations.name, 5, 1) as first_letter'),
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
        else if ($request->component_type == 'Firewall') { $table_name = 'firewalls'; }
        else if ($request->component_type == 'Hard Disk') { $table_name = 'hard_disks'; }
        else if ($request->component_type == 'Headset') { $table_name = 'headsets'; }
        else if ($request->component_type == 'Keyboard') { $table_name = 'keyboards'; }
        else if ($request->component_type == 'Mac') { $table_name = 'macs'; }
        else if ($request->component_type == 'Memory') { $table_name = 'memories'; }
        else if ($request->component_type == 'Monitor') { $table_name = 'monitors'; }
        else if ($request->component_type == 'Mouse') { $table_name = 'mice'; }
        else if ($request->component_type == 'Network Switch') { $table_name = 'network_switches'; }
        else if ($request->component_type == 'Portable Hard Disk') { $table_name = 'portable_hard_disks'; }
        else if ($request->component_type == 'Printer') { $table_name = 'printers'; }
        else if ($request->component_type == 'Projector') { $table_name = 'projectors'; }
        else if ($request->component_type == 'Router') { $table_name = 'routers'; }
        else if ($request->component_type == 'Scanner') { $table_name = 'scanners'; }
        else if ($request->component_type == 'Software') { $table_name = 'softwares'; }
        else if ($request->component_type == 'Speaker') { $table_name = 'speakers'; }
        else if ($request->component_type == 'Telephone') { $table_name = 'telephones'; }
        else if ($request->component_type == 'Uninterruptible Power Supply') { $table_name = 'uninterruptible_power_supplies'; }
        else if ($request->component_type == 'Video Card') { $table_name = 'video_cards'; }
        else if ($request->component_type == 'Other Component') { $table_name = 'other_components'; }

        $first_letter = $request->component_type == 'Software' ? '.name' : '.brand';

        // execute a query that will join the correct asset table
        return DB::table('asset_tags')
            ->join($table_name, $table_name.'.id', '=', 'asset_tags.component_id')
            ->join('work_stations', 'work_stations.id', '=', 'asset_tags.work_station_id')
            ->join('work_station_tags', 'work_station_tags.work_station_id', '=', 'work_stations.id')
            ->select(
                '*',
                'asset_tags.id as asset_tag_id',
                DB::raw('SUBSTRING(work_stations.name, 5, 1) as first_letter'),
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
    public function active(Request $request, $id)
    {
        $asset_tag = AssetTag::where('id', $id)->first();

        $asset_tag->status = 'active';

        $asset_tag->save();

        $log = new Log;

        $log->user_id = $request->user()->id;
        $log->activity_id = $asset_tag->id;
        $log->activity = 'repaired a unit.';
        $log->state = 'main.units';

        $log->save();

        return $asset_tag;
    }

    /**
     * Set Asset Tag Status as dispose
     *
    */
    public function dispose(Request $request, $id)
    {
        $asset_tag = AssetTag::where('id', $id)->first();

        $asset_tag->status = 'dispose';

        $asset_tag->save();

        $log = new Log;

        $log->user_id = $request->user()->id;
        $log->activity_id = $asset_tag->id;
        $log->activity = 'pulled out a unit for disposal.';
        $log->state = 'main.units';

        $log->save();
    }

    /**
     * Set Asset Tag Status as repair
     *
    */
    public function repair(Request $request, $id)
    {
        $asset_tag = AssetTag::where('id', $id)->first();

        $asset_tag->status = 'repair';

        $asset_tag->save();

        $log = new Log;

        $log->user_id = $request->user()->id;
        $log->activity_id = $asset_tag->id;
        $log->activity = 'pulled out a unit for repair.';
        $log->state = 'main.units';

        $log->save();
    }

    /**
     * Transfer a components of the work station
     * Returns array of object
     *
    */
    public function transfer(Request $request, $id)
    {
        $this->validate($request, [
            'work_station_id' => 'required',
        ]);

        $asset_tag = AssetTag::where('id', $id)->first();

        $asset_tag->work_station_id = $request->work_station_id;

        $asset_tag->save();

        $log = new Log;

        $log->user_id = $request->user()->id;
        $log->activity_id = $asset_tag->id;
        $log->activity = 'transfered a unit to a different work station.';
        $log->state = 'main.units';

        $log->save();        
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
        else if ($asset_tag->component_type == 'Firewall') { $table_name = 'firewalls'; }
        else if ($asset_tag->component_type == 'Hard Disk') { $table_name = 'hard_disks'; }
        else if ($asset_tag->component_type == 'Headset') { $table_name = 'headsets'; }
        else if ($asset_tag->component_type == 'Keyboard') { $table_name = 'keyboards'; }
        else if ($asset_tag->component_type == 'Mac') { $table_name = 'macs'; }
        else if ($asset_tag->component_type == 'Memory') { $table_name = 'memories'; }
        else if ($asset_tag->component_type == 'Monitor') { $table_name = 'monitors'; }
        else if ($asset_tag->component_type == 'Mouse') { $table_name = 'mice'; }
        else if ($asset_tag->component_type == 'Network Switch') { $table_name = 'network_switches'; }
        else if ($asset_tag->component_type == 'Portable Hard Disk') { $table_name = 'portable_hard_disks'; }
        else if ($asset_tag->component_type == 'Printer') { $table_name = 'printers'; }
        else if ($asset_tag->component_type == 'Projector') { $table_name = 'projectors'; }
        else if ($asset_tag->component_type == 'Router') { $table_name = 'routers'; }
        else if ($asset_tag->component_type == 'Scanner') { $table_name = 'scanners'; }
        else if ($asset_tag->component_type == 'Software') { $table_name = 'softwares'; }
        else if ($asset_tag->component_type == 'Speaker') { $table_name = 'speakers'; }
        else if ($asset_tag->component_type == 'Telephone') { $table_name = 'telephones'; }
        else if ($asset_tag->component_type == 'Uninterruptible Power Supply') { $table_name = 'uninterruptible_power_supplies'; }
        else if ($asset_tag->component_type == 'Video Card') { $table_name = 'video_cards'; }
        else if ($asset_tag->component_type == 'Other Component') { $table_name = 'other_components'; }

        $first_letter = $asset_tag->component_type == 'Software' ? '.name' : ($asset_tag->component_type == 'Mac' ? '.type' : '.brand') ;

        // execute a query that will join the correct asset table
        $asset = DB::table('asset_tags')
            ->join($table_name, $table_name.'.id', '=', 'asset_tags.component_id')
            ->select(
                '*',
                DB::raw('SUBSTRING(property_code, 5,5) as property_code'),
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

            // determine its component type
            if ($type == 'Desktop') { $table_name = 'desktops'; }
            else if ($type == 'Firewall') { $table_name = 'firewalls'; }
            else if ($type == 'Hard Disk') { $table_name = 'hard_disks'; }
            else if ($type == 'Headset') { $table_name = 'headsets'; }
            else if ($type == 'Keyboard') { $table_name = 'keyboards'; }
            else if ($type == 'Mac') { $table_name = 'macs'; }
            else if ($type == 'Memory') { $table_name = 'memories'; }
            else if ($type == 'Monitor') { $table_name = 'monitors'; }
            else if ($type == 'Mouse') { $table_name = 'mice'; }
            else if ($type == 'Network Switch') { $table_name = 'network_switches'; }
            else if ($type == 'Portable Hard Disk') { $table_name = 'portable_hard_disks'; }
            else if ($type == 'Printer') { $table_name = 'printers'; }
            else if ($type == 'Projector') { $table_name = 'projectors'; }
            else if ($type == 'Router') { $table_name = 'routers'; }
            else if ($type == 'Scanner') { $table_name = 'scanners'; }
            else if ($type == 'Software') { $table_name = 'softwares'; }
            else if ($type == 'Speaker') { $table_name = 'speakers'; }
            else if ($type == 'Telephone') { $table_name = 'telephones'; }
            else if ($type == 'Uninterruptible Power Supply') { $table_name = 'uninterruptible_power_supplies'; }
            else if ($type == 'Video Card') { $table_name = 'video_cards'; }
            else if ($type == 'Other Component') { $table_name = 'other_components'; }

            $first_letter = $type == 'Software' ? '.name' : ($type == 'Mac' ? '.type' : '.brand');

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
        $this->validate($request, [
            'asset_id' => 'required|numeric',
            'sequence' => 'required|numeric',
        ]);

        // fetches the asset
        $asset = Asset::with('type')->where('id', $request->asset_id)->first();

        if($asset){
            // see if there is an asset tag with the same type and sequence of the asset
            $duplicate = AssetTag::where('asset_type_id', $asset->asset_type_id)->where('sequence', $request->sequence)->first();

            if($duplicate){
                return response()->json(true);
            }
        }

        if($request->sequence < 10)
        {
            $filler = '0000';
        }
        else if($request->sequence >= 10 && $request->sequence < 100)
        {
            $filler = '000';
        }
        else if($request->sequence >= 100 && $request->sequence < 1000)
        {
            $filler = '00';
        }
        else if($request->sequence >= 1000 && $request->sequence < 10000)
        {
            $filler = '0';
        }

        $asset_tag = new AssetTag;

        $asset_tag->asset_type_id = $asset->asset_type_id;
        $asset_tag->asset_id = $request->asset_id;
        $asset_tag->work_station_id = $request->work_station_id;
        $asset_tag->computer_name = $request->computer_name;
        $asset_tag->serial = $request->serial;
        $asset_tag->prefix = $asset->type->prefix;
        $asset_tag->sequence = $request->sequence;
        $asset_tag->property_code = $asset->type->prefix . $filler . $request->sequence;
        $asset_tag->remarks = $request->remarks;
        $asset_tag->warranty_end = Carbon::parse($request->warranty_end)->toDateTimeString();

        $asset_tag->save();

        $activity_type = ActivityType::where('type', 'asset_tag')->where('action', 'create')->first();

        $activity = new Activity;

        $activity->user_id = $request->user()->id;
        $activity->activity_type_id = $activity_type->id;
        $activity->event_id = $asset_tag->id;

        $activity->save();
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
                $i.'.property_code' => 'required|numeric',
                $i.'.date_purchase' => 'date',
                $i.'.supplier' => 'string',
            ]);

            if ($request->input($i.'.component_type') == 'Desktop') { $property_code = 'PCPU'; }
            else if ($request->input($i.'.component_type') == 'Firewall') { $property_code = 'PFWL'; }
            else if ($request->input($i.'.component_type') == 'Hard Disk') { $property_code = 'PHDD'; }
            else if ($request->input($i.'.component_type') == 'Headset') { $property_code = 'PHDS'; }
            else if ($request->input($i.'.component_type') == 'Keyboard') { $property_code = 'PKBD'; }
            else if ($request->input($i.'.component_type') == 'Mac') { $property_code = 'PMAC'; }
            else if ($request->input($i.'.component_type') == 'Memory') { $property_code = 'PRAM'; }
            else if ($request->input($i.'.component_type') == 'Monitor') { $property_code = 'PMON'; }
            else if ($request->input($i.'.component_type') == 'Mouse') { $property_code = 'PMSE'; }
            else if ($request->input($i.'.component_type') == 'Network Switch') { $property_code = 'PNSW'; }
            else if ($request->input($i.'.component_type') == 'Portable Hard Disk') { $property_code = 'PPHD'; }
            else if ($request->input($i.'.component_type') == 'Printer') { $property_code = 'PPRT'; }
            else if ($request->input($i.'.component_type') == 'Projector') { $property_code = 'PPRJ'; }
            else if ($request->input($i.'.component_type') == 'Router') { $property_code = 'PRTR'; }
            else if ($request->input($i.'.component_type') == 'Scanner') { $property_code = 'PSCN'; }
            else if ($request->input($i.'.component_type') == 'Software') { $property_code = 'PSFW'; }
            else if ($request->input($i.'.component_type') == 'Speaker') { $property_code = 'PSPK'; }
            else if ($request->input($i.'.component_type') == 'Telephone') { $property_code = 'PTEL'; }
            else if ($request->input($i.'.component_type') == 'Uninterruptible Power Supply') { $property_code = 'PUPS'; }
            else if ($request->input($i.'.component_type') == 'Video Card') { $property_code = 'PVDC'; }
            else if ($request->input($i.'.component_type') == 'Other Component') { $property_code = 'POTH'; }

            //create a new instance of Skill per loop
            $asset_tag = new AssetTag;

            //define skill properties
            $asset_tag->component_id = $request->input($i.'.component_id');
            $asset_tag->component_type = $request->input($i.'.component_type');
            $asset_tag->work_station_id = $request->input($i.'.work_station_id');
            $asset_tag->serial = $request->input($i.'.serial') ? $request->input($i.'.serial') : null;
            $asset_tag->property_code =  $property_code . $request->input($i.'.property_code');
            $asset_tag->status = 'active';
            $asset_tag->date_purchase = $request->input($i.'.date_purchase') ? $request->input($i.'.date_purchase') : null;
            $asset_tag->supplier = $request->input($i.'.supplier') ? $request->input($i.'.supplier') : null;

            //save to database
            $asset_tag->save();
        };

        $log = new Log;

        $log->user_id = $request->user()->id;
        $log->activity_id = $asset_tag->id;
        $log->activity = 'added an asset tag.';
        $log->state = 'main.work-station';

        $log->save();
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
            'serial' => 'string',
            'property_code' => 'required|string',
        ]);

        if ($request->component_type == 'Desktop') { $property_code = 'PCPU'; }
            else if ($request->component_type == 'Firewall') { $property_code = 'PFWL'; }
            else if ($request->component_type == 'Hard Disk') { $property_code = 'PHDD'; }
            else if ($request->component_type == 'Headset') { $property_code = 'PHDS'; }
            else if ($request->component_type == 'Keyboard') { $property_code = 'PKBD'; }
            else if ($request->component_type == 'Mac') { $property_code = 'PMAC'; }
            else if ($request->component_type == 'Memory') { $property_code = 'PRAM'; }
            else if ($request->component_type == 'Monitor') { $property_code = 'PMON'; }
            else if ($request->component_type == 'Mouse') { $property_code = 'PMSE'; }
            else if ($request->component_type == 'Network Switch') { $property_code = 'PNSW'; }
            else if ($request->component_type == 'Portable Hard Disk') { $property_code = 'PPHD'; }
            else if ($request->component_type == 'Printer') { $property_code = 'PPRT'; }
            else if ($request->component_type == 'Projector') { $property_code = 'PPRJ'; }
            else if ($request->component_type == 'Router') { $property_code = 'PRTR'; }
            else if ($request->component_type == 'Scanner') { $property_code = 'PSCN'; }
            else if ($request->component_type == 'Software') { $property_code = 'PSFW'; }
            else if ($request->component_type == 'Speaker') { $property_code = 'PSPK'; }
            else if ($request->component_type == 'Telephone') { $property_code = 'PTEL'; }
            else if ($request->component_type == 'Uninterruptible Power Supply') { $property_code = 'PUPS'; }
            else if ($request->component_type == 'Video Card') { $property_code = 'PVDC'; }
            else if ($request->component_type == 'Other Component') { $property_code = 'POTH'; }

        $asset_tag = AssetTag::where('id', $id)->first();

        $asset_tag->serial = $request->serial ? $request->serial : null;
        $asset_tag->property_code = $property_code . $request->property_code;
        $asset_tag->date_purchase = $request->date_purchase ? $request->date_purchase : null; 
        $asset_tag->supplier = $request->supplier ? $request->supplier : null;

        $asset_tag->save();

        $log = new Log;

        $log->user_id = $request->user()->id;
        $log->activity_id = $asset_tag->id;
        $log->activity = 'updated an asset tag.';
        $log->state = 'main.work-station';

        $log->save(); 
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $log = new Log;

        $log->user_id = $request->user()->id;
        $log->activity_id = $id;
        $log->activity = 'deleted an asset tag.';
        $log->state = 'main.work-station';

        $log->save();

        return AssetTag::where('id', $id)->delete();
    }
}
