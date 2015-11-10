<?php

namespace App\Http\Controllers;
use App\UninterruptiblePowerSupply;
use DB;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class UninterruptiblePowerSupplyController extends Controller
{
    /**
     * Search database for records
     *
     * @return \Illuminate\Http\Response
    */
    public function search(Request $request)
    {
        return DB::table('uninterruptible_power_supplies')
            ->select('*', DB::raw('LEFT(maker, 1) as first_letter'), DB::raw('DATE_FORMAT(created_at, "%h:%i %p, %b. %d, %Y") as created_at'))
            ->where('brand', 'like', '%'. $request->userInput .'%')
            ->orWhere('model', 'like', '%'. $request->userInput .'%')
            ->orWhere('wattage', 'like', '%'. $request->userInput .'%')
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
        return DB::table('uninterruptible_power_supplies')->select('*', DB::raw('LEFT(brand, 1) as first_letter'), DB::raw('DATE_FORMAT(created_at, "%h:%i %p, %b. %d, %Y") as created_at'))->orderBy('updated_at', 'desc')->paginate(25);
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
            'brand' => 'required|string',
            'model' => 'required|string',
            'wattage' => 'required|string',
        ]);

        // create a new instance of desktop
        $ups = new UninterruptiblePowerSupply;

        // assign its properties
        $ups->brand = $request->brand;
        $ups->model = $request->model;
        $ups->wattage = $request->wattage;

        // save to database
        $ups->save();
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
