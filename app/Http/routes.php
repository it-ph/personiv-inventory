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

Route::group(['middleware' => 'auth'], function () {
	// Route Resource APIs
	Route::resource('user', 'UserController');
	Route::resource('department', 'DepartmentController');
	Route::resource('employee', 'EmployeeController');
	Route::resource('work-station', 'WorkStationController');
	Route::resource('asset-tag', 'AssetTagController');
	Route::resource('email-report', 'EmailReportController');
	Route::resource('asset-detail', 'AssetDetailController');
	Route::resource('asset-status', 'AssetStatusController');
	Route::resource('asset-type', 'AssetTypeController');
	Route::resource('asset-type-detail', 'AssetTypeDetailController');
	Route::resource('department-work-station', 'DepartmentWorkStationController');
	Route::resource('purchase-order', 'PurchaseOrderController');
	Route::resource('vendor', 'VendorController');
	Route::resource('activity', 'ActivityController');
	Route::resource('activity-type', 'ActivityTypeController');

	Route::post('user-check-password', 'UserController@checkPassword');
	Route::post('user-change-password', 'UserController@changePassword');

	// Route Resource Paginations
	Route::get('work-station-paginate', 'WorkStationController@paginate');
	// paginate by department
	Route::get('employee-paginate/{departmentID}', 'EmployeeController@paginateDepartment');
	// Route Resource Search
	Route::post('work-station-search', 'WorkStationController@search');
	// Route resource models
	// Route resource others
	// Other routes

	// Route resource store multiple
	Route::post('asset-tag-multiple', 'AssetTagController@storeMultiple');

	// fetch all components of the workstation
	Route::get('asset-tag-work-station/{workStationID}', 'AssetTagController@workstation');

	// fetch specific component by asset tag id
	Route::get('asset-tag-specific/{assetTagID}', 'AssetTagController@specific');

	// transfer asset to another work station
	Route::put('asset-tag-transfer/{assetTagID}', 'AssetTagController@transfer');

	// set asset tag status to repair
	Route::put('asset-tag-repair/{assetTagID}', 'AssetTagController@repair');

	// set asset tag status to dispose
	Route::put('asset-tag-dispose/{assetTagID}', 'AssetTagController@dispose');

	// set asset tag status to active
	Route::put('asset-tag-active/{assetTagID}', 'AssetTagController@active');

	// fetch all active units 
	Route::post('asset-tag-active-unit', 'AssetTagController@active_unit');

	// fetch all repair units 
	Route::post('asset-tag-repair-unit', 'AssetTagController@repair_unit');

	// fetch all dispose units 
	Route::post('asset-tag-dispose-unit', 'AssetTagController@dispose_unit');

	// fetch for vacant work stations
	Route::post('work-station-vacant', 'WorkStationController@vacant');
	// fetch workstation tag by workstation
	Route::get('work-station-tag-workstation/{workstationID}', 'WorkStationTagController@workstation');
	// fetch employees assigned on that workstation
	Route::get('employee-workstation/{workStationID}', 'EmployeeController@workstation');
	// fetch  unassigned employees per department
	Route::get('employee-department/{departmentID}', 'EmployeeController@department');
	// fetch employee details and work station 
	Route::get('employee-tag-employee/{employeeID}', 'EmployeeTagController@employee');

	Route::get('barcode-assets/{format}/starting-point/{starting_point}/quantity/{quantity}', 'BarcodeController@assets');
	Route::get('barcode-work-station/{floor}/division/{division}/type/{type}/starting-point/{starting_point}/quantity/{quantity}', 'BarcodeController@workStation');

	Route::get('work-station-floors/{departmentID}', 'WorkStationController@floors');
	Route::get('work-station-divisions/{departmentID}/floor/{floor}', 'WorkStationController@divisions');
	Route::post('work-station-available-transfer/{workStationID}', 'WorkStationController@availableTransfer');
	Route::put('asset-tag-repair-components/{workStationID}', 'AssetTagController@repairComponents');
	Route::put('asset-tag-dispose-components/{workStationID}', 'AssetTagController@disposeComponents');
	Route::put('asset-tag-active-components/{workStationID}', 'AssetTagController@activeComponents');
	Route::post('asset-tag-search-barcode', 'AssetTagController@searchBarcode');
	Route::post('work-station-tag-search-barcode', 'WorkStationTagController@searchBarcode');
	Route::post('asset-tag-available-swap', 'AssetTagController@availableSwap');
	Route::put('asset-tag-swap/{assetTagID}', 'AssetTagController@swap');
	Route::put('asset-tag-transfer-components/{workStationID}', 'AssetTagController@transferComponents');
	Route::put('asset-tag-swap-components/{workStationID}/target/{swapWorkStationID}', 'AssetTagController@swapComponents');
});
