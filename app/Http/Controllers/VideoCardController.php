<?php

namespace App\Http\Controllers;
use App\VideoCard;
use DB;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class VideoCardController extends Controller
{
    /**
     * Fetch distinct table columns
     *
     * @return \Illuminate\Http\Response
    */
    public function distinct(Request $request)
    {
        return DB::table('video_cards')
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
        return DB::table('video_cards')
            ->select('*', DB::raw('LEFT(brand, 1) as first_letter'), DB::raw('DATE_FORMAT(created_at, "%h:%i %p, %b. %d, %Y") as created_at'))
            ->where('brand', 'like', '%'. $request->userInput .'%')
            ->orWhere('gpu', 'like', '%'. $request->userInput .'%')
            ->orWhere('size', 'like', '%'. $request->userInput .'%')
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
        return DB::table('video_cards')->select('*', DB::raw('LEFT(brand, 1) as first_letter'), DB::raw('DATE_FORMAT(created_at, "%h:%i %p, %b. %d, %Y") as created_at'))->whereNull('deleted_at')->orderBy('updated_at', 'desc')->paginate(25);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return VideoCard::get();
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
            'gpu' => 'required|string',
            'size' => 'required|string',
        ]);

        // create a new instance of desktop
        $video_card = new VideoCard;

        // assign its properties
        $video_card->brand = $request->brand;
        $video_card->gpu = $request->gpu;
        $video_card->size = $request->size;

        // save to database
        $video_card->save();
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
