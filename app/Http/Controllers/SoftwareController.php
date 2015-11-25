<?php

namespace App\Http\Controllers;
use App\Software;
use DB;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class SoftwareController extends Controller
{
    // fetch other records
    public function other($id)
    {
        return DB::table('softwares')->select('*', DB::raw('LEFT(maker, 1) as first_letter'))->whereNotIn('id', [$id])->get();
    }
    /**
     * Fetch distinct table columns
     *
     * @return \Illuminate\Http\Response
    */
    public function distinct(Request $request)
    {
        if($request->search == 'name')
        {
            return DB::table('softwares')
            ->select(DB::raw("DISTINCT ". $request->search))
            ->where('maker', $request->maker)
            ->get();
        }
        else if($request->search == 'version')
        {
            return DB::table('softwares')
            ->select('*')
            ->where('maker', $request->maker)
            ->where('name', $request->name)
            ->get();
        }

        return DB::table('softwares')
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
        return DB::table('softwares')
            ->select('*', DB::raw('LEFT(maker, 1) as first_letter'), DB::raw('DATE_FORMAT(created_at, "%h:%i %p, %b. %d, %Y") as created_at'))
            ->where('name', 'like', '%'. $request->userInput .'%')
            ->orWhere('version', 'like', '%'. $request->userInput .'%')
            ->orWhere('maker', 'like', '%'. $request->userInput .'%')
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
        return DB::table('softwares')->select('*', DB::raw('LEFT(maker, 1) as first_letter'), DB::raw('DATE_FORMAT(created_at, "%h:%i %p, %b. %d, %Y") as created_at'))->whereNull('deleted_at')->orderBy('updated_at', 'desc')->paginate(25);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Software::get();
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
            'name' => 'required|string',
            'version' => 'required|string',
            'maker' => 'required|string',
        ]);

        // create a new instance of desktop
        $software = new Software;

        // assign its properties
        $software->name = $request->name;
        $software->version = $request->version;
        $software->maker = $request->maker;

        // save to database
        $software->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Software::where('id', $id)->first();
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
