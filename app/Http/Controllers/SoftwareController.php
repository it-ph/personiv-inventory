<?php

namespace App\Http\Controllers;
use App\Software;
use DB;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class SoftwareController extends Controller
{
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
        return DB::table('softwares')->select('*', DB::raw('LEFT(maker, 1) as first_letter'), DB::raw('DATE_FORMAT(created_at, "%h:%i %p, %b. %d, %Y") as created_at'))->orderBy('updated_at', 'desc')->paginate(25);
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
