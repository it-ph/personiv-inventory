<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
	$user = Auth::user();
	if (Auth::check()) {
		return redirect('/home');
    }
    return view('auth.login');
});

// Authentication routes...
Route::get('auth/login', 'Auth\AuthController@getLogin');
Route::post('auth/login', 'Auth\AuthController@postLogin');
Route::get('auth/logout', 'Auth\AuthController@getLogout');

// Registration routes...
Route::get('auth/register', 'Auth\AuthController@getRegister');
Route::post('auth/register', 'Auth\AuthController@postRegister');

// Shell Page
Route::get('/home', ['middleware' => 'auth', function(){
	return view('admin.home');
}]);

// Route Resource APIs
Route::resource('user', 'UserController');
Route::resource('department', 'DepartmentController');
Route::resource('desktop', 'DesktopController');
Route::resource('hard-disk', 'HardDiskController');
Route::resource('headset', 'HeadsetController');
Route::resource('keyboard', 'KeyboardController');
Route::resource('memory', 'MemoryController');
Route::resource('monitor', 'MonitorController');
Route::resource('mouse', 'MouseController');
Route::resource('printer', 'PrinterController');
Route::resource('scanner', 'ScannerController');
Route::resource('software', 'SoftwareController');
Route::resource('ups', 'UninterruptiblePowerSupplyController');
Route::resource('video-card', 'VideoCardController');
Route::resource('other-component', 'OtherComponentController');
Route::resource('employee', 'EmployeeController');
Route::resource('work-station', 'WorkStationController');
Route::resource('asset-tag', 'AssetTagController');

// Route Resource Paginations
Route::get('desktop-paginate', 'DesktopController@paginate');
Route::get('hard-disk-paginate', 'HardDiskController@paginate');
Route::get('headset-paginate', 'HeadsetController@paginate');
Route::get('keyboard-paginate', 'KeyboardController@paginate');
Route::get('memory-paginate', 'MemoryController@paginate');
Route::get('monitor-paginate', 'MonitorController@paginate');
Route::get('mouse-paginate', 'MouseController@paginate');
Route::get('printer-paginate', 'PrinterController@paginate');
Route::get('scanner-paginate', 'ScannerController@paginate');
Route::get('software-paginate', 'SoftwareController@paginate');
Route::get('ups-paginate', 'UninterruptiblePowerSupplyController@paginate');
Route::get('video-card-paginate', 'VideoCardController@paginate');
Route::get('other-component-paginate', 'OtherComponentController@paginate');
Route::get('employee-paginate/{departmentID}', 'EmployeeController@paginate');
Route::get('work-station-paginate/{departmentID}', 'WorkStationController@paginate');

// Route Resource Search
Route::post('desktop-search', 'DesktopController@search');
Route::post('hard-disk-search', 'HardDiskController@search');
Route::post('headset-search', 'HeadsetController@search');
Route::post('keyboard-search', 'KeyboardController@search');
Route::post('memory-search', 'MemoryController@search');
Route::post('monitor-search', 'MonitorController@search');
Route::post('mouse-search', 'MouseController@search');
Route::post('printer-search', 'PrinterController@search');
Route::post('scanner-search', 'ScannerController@search');
Route::post('software-search', 'SoftwareController@search');
Route::post('ups-search', 'UninterruptiblePowerSupplyController@search');
Route::post('video-card-search', 'VideoCardController@search');
Route::post('other-component-search', 'OtherComponentController@search');
Route::post('employee-search/{departmentID}', 'EmployeeController@search');
Route::post('work-station-search/{departmentID}', 'WorkStationController@search');

// Route Resource Distinct column
Route::post('desktop-distinct', 'DesktopController@distinct');
Route::post('hard-disk-distinct', 'HardDiskController@distinct');
Route::post('headset-distinct', 'HeadsetController@distinct');
Route::post('keyboard-distinct', 'KeyboardController@distinct');
Route::post('memory-distinct', 'MemoryController@distinct');
Route::post('monitor-distinct', 'MonitorController@distinct');
Route::post('mouse-distinct', 'MouseController@distinct');
Route::post('printer-distinct', 'PrinterController@distinct');
Route::post('scanner-distinct', 'ScannerController@distinct');
Route::post('software-distinct', 'SoftwareController@distinct');
Route::post('ups-distinct', 'UninterruptiblePowerSupplyController@distinct');
Route::post('other-component-distinct', 'OtherComponentController@distinct');
Route::post('video-card-distinct', 'VideoCardController@distinct');

// Route resource models
Route::post('/desktop-model', 'DesktopController@model');
Route::post('/hard-disk-model', 'HardDiskController@model');
Route::post('/headset-model', 'HeadsetController@model');
Route::post('/keyboard-model', 'KeyboardController@model');
Route::post('/monitor-model', 'MonitorController@model');
Route::post('/mouse-model', 'MouseController@model');
Route::post('/ups-model', 'UninterruptiblePowerSupplyController@model');
Route::post('/other-component-model', 'OtherComponentController@model');

// Other routes

/**
 * Workstation fetch by department except the existing
 * used at work-station-toolbar controller
*/
Route::get('/work-station-department/{departmentID}/station/{workStationID}', 'WorkStationController@department');

// Route resource store multiple
Route::post('/asset-tag-multiple', 'AssetTagController@storeMultiple');

// fetch all components of the workstation
Route::get('/asset-tag-work-station/{workStationID}', 'AssetTagController@workstation');

// fetch specific component by asset tag id
Route::get('/asset-tag-specific/{assetTagID}', 'AssetTagController@specific');

// transfer asset to another work station
Route::put('/asset-tag-transfer/{assetTagID}', 'AssetTagController@transfer');

// set asset tag status to repair
Route::put('/asset-tag-repair/{assetTagID}', 'AssetTagController@repair');

// set asset tag status to dispose
Route::put('/asset-tag-dispose/{assetTagID}', 'AssetTagController@dispose');