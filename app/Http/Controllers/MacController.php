<?php

namespace App\Http\Controllers;
use App\Mac;
use App\Log;
use DB;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class MacController extends Controller
{
    // fetch other records
    public function other($id)
    {
        return DB::table('macs')->select('*', DB::raw('LEFT(type, 1) as first_letter'))->whereNotIn('id', [$id])->get();
    }
    /**
     * Fetch processor by type
     *
     * @return \Illuminate\Http\Response
    */
    public function processor(Request $request)
    {
        return DB::table('macs')->select('*')->where('type', '=', $request->type)->get();
    }

    /**
     * Fetch distinct table columns
     *
     * @return \Illuminate\Http\Response
    */
    public function distinct(Request $request)
    {
        return DB::table('macs')
            ->select(DB::raw("DISTINCT ". $request->search))
            ->get();
    }

    /**
     * Search database for records
     *
     * @return \Illuminate\Http\Response
    */
    public function search(Request $request)
    {
        return DB::table('macs')
            ->select('*', DB::raw('LEFT(type, 1) as first_letter'), DB::raw('DATE_FORMAT(created_at, "%h:%i %p, %b. %d, %Y") as created_at'))
            ->where('type', 'like', '%'. $request->userInput .'%')
            ->orWhere('processor', 'like', '%'. $request->userInput .'%')
            ->whereNull('deleted_at')
            ->groupBy('id')
            ->orderBy('updated_at', 'desc')
            ->whereNull('deleted_at')
            ->get();
    }


    /**
     * Paginate listing of the resource.
     * 
     * @return  \Illuminate\Http\Response
    */
    public function paginate()
    {
        return DB::table('macs')->select('*', DB::raw('LEFT(type, 1) as first_letter'), DB::raw('DATE_FORMAT(created_at, "%h:%i %p, %b. %d, %Y") as created_at'))->whereNull('deleted_at')->orderBy('updated_at', 'desc')->paginate(25);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Mac::get();
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
        // validate request input
        $this->validate($request, [
            'type' => 'required|string',
            'processor' => 'required|string',
        ]);

        // create a new instance of desktop
        $mac = new Mac;

        // assign its properties
        $mac->type = $request->type;
        $mac->processor = $request->processor;

        // save to database
        $mac->save();

        // create a Log record
        $log = new Log;

        $log->user_id = $request->user()->id;
        $log->activity_id = $mac->id;
        $log->activity = 'added a new Mac.';
        $log->state = 'main.assets';

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
        return Mac::where('id', $id)->first();
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
