<?php

namespace App\Http\Controllers;
use App\OtherComponent;
use DB;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class OtherComponentController extends Controller
{
    // fetch other records
    public function other($id)
    {
        return DB::table('desktops')->select('*', DB::raw('LEFT(brand, 1) as first_letter'))->whereNotIn('id', [$id])->get();    }
    }
    /**
     * Fetch models by brand
     *
     * @return \Illuminate\Http\Response
    */
    public function model(Request $request)
    {
        return DB::table('other_components')->select('*')->where('brand', '=', $request->brand)->get();
    }

    /**
     * Fetch distinct table columns
     *
     * @return \Illuminate\Http\Response
    */
    public function distinct(Request $request)
    {
        return DB::table('other_components')
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
        return DB::table('other_components')
            ->select('*', DB::raw('LEFT(brand, 1) as first_letter'), DB::raw('DATE_FORMAT(created_at, "%h:%i %p, %b. %d, %Y") as created_at'))
            ->where('brand', 'like', '%'. $request->userInput .'%')
            ->orWhere('model', 'like', '%'. $request->userInput .'%')
            ->orWhere('type', 'like', '%'. $request->userInput .'%')
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
        return DB::table('other_components')->select('*', DB::raw('LEFT(brand, 1) as first_letter'), DB::raw('DATE_FORMAT(created_at, "%h:%i %p, %b. %d, %Y") as created_at'))->whereNull('deleted_at')->orderBy('updated_at', 'desc')->paginate(25);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return OtherComponent::get();
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
            'type' => 'required|string',
        ]);

        // create a new instance of desktop
        $other_component = new OtherComponent;

        // assign its properties
        $other_component->brand = $request->brand;
        $other_component->model = $request->model;
        $other_component->type = $request->type;

        // save to database
        $other_component->save();
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
