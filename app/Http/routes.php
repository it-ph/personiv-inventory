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
	Route::resource('asset', 'AssetController');
	Route::resource('asset-detail', 'AssetDetailController');
	Route::resource('asset-status', 'AssetStatusController');
	Route::resource('asset-type', 'AssetTypeController');
	Route::resource('asset-type-detail', 'AssetTypeDetailController');
	Route::resource('department-work-station', 'DepartmentWorkStationController');
	Route::resource('purchase-order', 'PurchaseOrderController');
	Route::resource('vendor', 'VendorController');
	Route::resource('activity', 'ActivityController');
	Route::resource('activity-type', 'ActivityTypeController');
	Route::resource('asset-purchase-order', 'AssetPurchaseOrderController');
	Route::resource('inventory-report', 'InventoryReportController');

	Route::post('user-check-password', 'UserController@checkPassword');
	Route::post('user-change-password', 'UserController@changePassword');

	Route::get('activity-paginate', 'ActivityController@paginate');
	Route::get('asset-paginate/{assetTypeID}', 'AssetController@paginate');
	Route::get('asset-tag-paginate/{assetTypeID}', 'AssetTagController@paginate');
	Route::get('purchase-order-paginate', 'PurchaseOrderController@paginate');
	// Route Resource Paginations
	Route::get('work-station-paginate', 'WorkStationController@paginate');
	// paginate by department
	Route::get('employee-paginate/{departmentID}', 'EmployeeController@paginateDepartment');
	// Route Resource Search
	Route::post('work-station-search', 'WorkStationController@search');
	Route::post('asset-tag-search', 'AssetTagController@search');
	Route::post('purchase-order-search', 'PurchaseOrderController@search');
	Route::get('asset-tag-repair/{assetTagID}', 'AssetTagController@repair');
	// Route resource models
	// Route resource others
	// Other routes
	Route::post('asset-check-duplicate/{assetID}', 'AssetController@checkDuplicate');
	Route::post('work-station-check-ip/{workStationID}', 'WorkStationController@checkIP');
	Route::get('user-others', 'UserController@others');
	Route::get('user-reset-password/{userID}', 'UserController@resetPassword');
	Route::get('asset-brands/{assetTypeID}', 'AssetController@brands');
	Route::post('asset-tag-check-sequence', 'AssetTagController@checkSequence');
	Route::get('work-station-dashboard', 'WorkStationController@dashboard');
	Route::get('work-station-others/{workStationID}', 'WorkStationController@others');
	Route::get('department-work-station-relation/{departmentID}/work-station/{workStationID}', 'DepartmentWorkStationController@relation');
	Route::post('vendor-distinct', 'VendorController@distinct');
	Route::get('vendor-contact-persons/{id}', 'VendorController@contactPersons');
	Route::get('vendor-contact-numbers/{id}', 'VendorController@contactNumbers');
	Route::post('asset-tag-last-property-code', 'AssetTagController@lastPropertyCode');
	Route::get('inventory-report-dashboard', 'InventoryReportController@dashboard');
	Route::get('asset-purchase-orders/{assetID}', 'AssetController@purchaseOrders');
	Route::get('asset-tag-statuses/{assetTagID}', 'AssetTagController@statuses');
	Route::post('inventory-report-weekly-chart', 'InventoryReportController@weeklyChart');
	Route::post('user-check-email', 'UserController@checkEmail');
	Route::post('department-check-department', 'DepartmentController@checkDepartment');
	Route::post('asset-type-check-asset-type', 'AssetTypeController@checkAssetType');
	Route::get('department-work-station-department/{departmentID}', 'DepartmentWorkStationController@department');
	Route::post('work-station-batch-transfer/{workStationID}', 'WorkStationController@batchTransfer');
	Route::post('work-station-batch-swap/{workStationID}', 'WorkStationController@batchSwap');
	
	// Route resource store multiple
	Route::post('asset-tag-multiple', 'AssetTagController@storeMultiple');

	// transfer asset to another work station
	Route::put('asset-tag-transfer/{assetTagID}', 'AssetTagController@transfer');

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
	Route::post('work-station-tag-search-barcode', 'WorkStationTagController@searchBarcode');
	Route::post('asset-tag-check-swap', 'AssetTagController@checkSwap');
	Route::put('asset-tag-swap/{assetTagID}', 'AssetTagController@swap');
});
