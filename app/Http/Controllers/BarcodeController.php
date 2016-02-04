<?php

namespace App\Http\Controllers;
use DNS1D;
use DNS2D;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class BarcodeController extends Controller
{
    public function assets($format, $starting_point, $quantity)
    {
    	$barcode = array();

    	for ($i = 0; $i < $quantity; $i++) {
    		$number = $starting_point + $i;

    		if($number < 10)
    			$trailing = '0000';
    		else if($number > 9 && $number < 100)
    			$trailing = '000';
    		else if($number > 99 && $number < 1000)
    			$trailing = '00';
    		else if($number > 999 && $number < 10000)
    			$trailing = '0';
    		else
    			$trailing = null;
    		

    		$item = $format . $trailing . $number;

    		array_push($barcode, $item);
    	}

		return view('excel.barcode')
			->with('barcodes', $barcode);
    }

    public function workStation($format, $division, $type, $starting_point, $quantity)
    {
    	$barcode = array();

    	for ($i = 0; $i < $quantity; $i++) {
    		$number = $starting_point + $i;

    		if($number < 10)
    			$trailing = '00';
    		else if($number > 9 && $number < 100)
    			$trailing = '0';
    		else
    			$trailing = null;


    		$item = 'A'. $format .'-'. $division. '-'. $type. $trailing . $number;

    		array_push($barcode, $item);
    	}

		return view('excel.barcode')
			->with('barcodes', $barcode);
    }
}
