<?php

namespace App\Http\Controllers;
use Mail;
use DB;
use Excel;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class EmailReportController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->sheet_names = array(
            'Desktop' => 'desktops',
            'Firewall' => 'firewalls',
            'Hard Disk' => 'hard_disks',
            'Headset' => 'headsets',
            'Keyboard' => 'keyboards' ,
            'Mac' => 'macs' ,
            'Memory' => 'memories' ,
            'Monitor' => 'monitors',
            'Mouse' => 'mice',
            'Network Switch' => 'network_switches',
            'Portable Hard Disk' => 'portable_hard_disks',
            'Printer'=> 'printers', 
            'Projector' => 'projectors',
            'Scanner' => 'scanners', 
            'Software' => 'softwares', 
            'Speaker' => 'speakers' ,
            'Telephone' => 'telephones' ,
            'Uninterruptible Power Supply' => 'uninterruptible_power_supplies',
            'Video Card' => 'video_cards',
            'Other Component' => 'other_components',
        );

        // create the excell file
            Excel::create('Inventory Report', function($excel){
                // CPU Sheet
                foreach ($this->sheet_names as $key => $value) {
                    $this->key = $key;
                    $this->value = $value;
                    $excel->sheet($this->key, function($sheet){
                        $data = DB::table('asset_tags')
                            ->join('work_stations', 'work_stations.id', '=', 'asset_tags.work_station_id')
                            ->join($this->value, $this->value.'.id', '=', 'asset_tags.component_id')
                            ->select('*')
                            ->where('asset_tags.component_type', $this->key)
                            ->orderBy('work_stations.name')
                            ->get();

                        $active = DB::table('asset_tags')
                            ->join('work_stations', 'work_stations.id', '=', 'asset_tags.work_station_id')
                            ->join($this->value, $this->value.'.id', '=', 'asset_tags.component_id')
                            ->select('*')
                            ->where('asset_tags.component_type', $this->key)
                            ->where('asset_tags.status', 'active')
                            ->orderBy('work_stations.name')
                            ->count();

                        $repair = DB::table('asset_tags')
                            ->join('work_stations', 'work_stations.id', '=', 'asset_tags.work_station_id')
                            ->join($this->value, $this->value.'.id', '=', 'asset_tags.component_id')
                            ->select('*')
                            ->where('asset_tags.component_type', $this->key)
                            ->where('asset_tags.status', 'repair')
                            ->orderBy('work_stations.name')
                            ->count();

                        $dispose = DB::table('asset_tags')
                            ->join('work_stations', 'work_stations.id', '=', 'asset_tags.work_station_id')
                            ->join($this->value, $this->value.'.id', '=', 'asset_tags.component_id')
                            ->select('*')
                            ->where('asset_tags.component_type', $this->key)
                            ->where('asset_tags.status', 'dispose')
                            ->orderBy('work_stations.name')
                            ->count();

                        if($this->key == 'Hard Disk' || $this->key == 'Portable Hard Disk'){
                            $sheet->loadView('excel.assets-capacity')->with('data',$data)->with('active', $active)->with('repair', $repair)->with('dispose', $dispose);
                        }
                        else if($this->key == 'Mac'){
                            $sheet->loadView('excel.assets-mac')->with('data',$data)->with('active', $active)->with('repair', $repair)->with('dispose', $dispose);
                        }
                        else if($this->key == 'Memory'){
                            $sheet->loadView('excel.assets-memory')->with('data',$data)->with('active', $active)->with('repair', $repair)->with('dispose', $dispose);
                        }
                        else if($this->key == 'Other Component'){
                            $sheet->loadView('excel.assets-other')->with('data',$data)->with('active', $active)->with('repair', $repair)->with('dispose', $dispose);
                        }
                        else if($this->key == 'Software'){
                            $sheet->loadView('excel.assets-software')->with('data',$data)->with('active', $active)->with('repair', $repair)->with('dispose', $dispose);
                        }
                        else{
                            $sheet->loadView('excel.assets')->with('data',$data)->with('active', $active)->with('repair', $repair)->with('dispose', $dispose);
                        }
                        
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
