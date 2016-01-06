<?php

namespace App\Http\Controllers;
use App\Memory;
use App\Log;
use DB;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class MemoryController extends Controller
{
    // fetch other records
    public function other($id)
    {
        return DB::table('memories')->select('*', DB::raw('LEFT(brand, 1) as first_letter'))->whereNotIn('id', [$id])->get();
    }
    /**
     * Fetch distinct table columns
     *
     * @return \Illuminate\Http\Response
    */
    public function distinct(Request $request)
    {
        if($request->search == 'type')
        {
            return DB::table('memories')
            ->select(DB::raw("DISTINCT ". $request->search))
            ->where('brand', $request->brand)
            ->get();
        }
        else if($request->search == 'speed')
        {
            return DB::table('memories')
            ->select(DB::raw("DISTINCT ". $request->search))
            ->where('brand', $request->brand)
            ->where('type', $request->type)
            ->get();
        }
        else if($request->search == 'size')
        {
            return DB::table('memories')
            ->select('*')
            ->where('brand', $request->brand)
            ->where('type', $request->type)
            ->where('speed', $request->speed)
            ->get();   
        }

        return DB::table('memories')
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
        return DB::table('memories')
            ->select('*', DB::raw('LEFT(brand, 1) as first_letter'), DB::raw('DATE_FORMAT(created_at, "%h:%i %p, %b. %d, %Y") as created_at'))
            ->where('brand', 'like', '%'. $request->userInput .'%')
            // ->orWhere('model', 'like', '%'. $request->userInput .'%')
            ->orWhere('size', 'like', '%'. $request->userInput .'%')
            ->orWhere('speed', 'like', '%'. $request->userInput .'%')
            ->whereNull('deleted_at')
            ->groupBy('id')
            ->orderBy('updated_at', 'desc')
            ->get();
    }

    /**
     * Paginate listing of the resource.
     * 
     * @return  \Illuminate\Http\Response
    */
    public function paginate()
    {
        return DB::table('memories')->select('*', DB::raw('LEFT(brand, 1) as first_letter'), DB::raw('DATE_FORMAT(created_at, "%h:%i %p, %b. %d, %Y") as created_at'))->whereNull('deleted_at')->orderBy('updated_at', 'desc')->paginate(25);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Memory::get();
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
            'brand' => 'required|string',
            'type' => 'required|string',
            'size' => 'required|string',
            'speed' => 'required|string',
        ]);

        // create a new instance of desktop
        $memory = new Memory;

        // assign its properties
        $memory->brand = $request->brand;
        $memory->type = $request->type;
        $memory->size = $request->size;
        $memory->speed = $request->speed;

        // save to database
        $memory->save();

        // create a Log record
        $log = new Log;

        $log->user_id = $request->user()->id;
        $log->activity_id = $memory->id;
        $log->activity = 'added a new Memory.';
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
        return Memory::where('id', $id)->first();
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
