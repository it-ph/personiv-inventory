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
Route::resource('employee-tag', 'EmployeeTagController');
Route::resource('work-station', 'WorkStationController');
Route::resource('work-station-tag', 'WorkStationTagController');
Route::resource('asset-tag', 'AssetTagController');
Route::resource('firewall', 'FirewallController');
Route::resource('mac', 'MacController');
Route::resource('portable-hard-disk', 'PortableHardDiskController');
Route::resource('network-switch', 'NetworkSwitchController');
Route::resource('router', 'RouterController');
Route::resource('speaker', 'SpeakerController');
Route::resource('telephone', 'TelephoneController');
Route::resource('projector', 'ProjectorController');
Route::resource('log', 'LogController');
Route::resource('email-report', 'EmailReportController');

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
Route::get('firewall-paginate', 'FirewallController@paginate');
Route::get('mac-paginate', 'MacController@paginate');
Route::get('portable-hard-disk-paginate', 'PortableHardDiskController@paginate');
Route::get('network-switch-paginate', 'NetworkSwitchController@paginate');
Route::get('router-paginate', 'RouterController@paginate');
Route::get('speaker-paginate', 'SpeakerController@paginate');
Route::get('telephone-paginate', 'TelephoneController@paginate');
Route::get('projector-paginate', 'ProjectorController@paginate');
Route::get('employee-paginate', 'EmployeeController@paginate');
Route::get('work-station-paginate', 'WorkStationController@paginate');
Route::get('log-paginate', 'LogController@paginate');
// paginate by department
Route::get('employee-paginate/{departmentID}', 'EmployeeController@paginateDepartment');
Route::get('work-station-paginate/{departmentID}', 'WorkStationController@paginateDepartment');
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
Route::post('asset-tag-search', 'AssetTagController@search');
Route::post('firewall-search', 'FirewallController@search');
Route::post('mac-search', 'MacController@search');
Route::post('portable-hard-disk-search', 'PortableHardDiskController@search');
Route::post('network-switch-search', 'NetworkSwitchController@search');
Route::post('router-search', 'RouterController@search');
Route::post('speaker-search', 'SpeakerController@search');
Route::post('telephone-search', 'TelephoneController@search');
Route::post('projector-search', 'ProjectorController@search');
Route::post('employee-search', 'EmployeeController@search');
Route::post('work-station-search', 'WorkStationController@search');
// search by 
Route::post('employee-search/{departmentID}', 'EmployeeController@searchDepartment');
Route::post('work-station-search/{departmentID}', 'WorkStationController@searchDepartment');
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
Route::post('firewall-distinct', 'FirewallController@distinct');
Route::post('mac-distinct', 'MacController@distinct');
Route::post('portable-hard-disk-distinct', 'PortableHardDiskController@distinct');
Route::post('network-switch-distinct', 'NetworkSwitchController@distinct');
Route::post('router-distinct', 'RouterController@distinct');
Route::post('speaker-distinct', 'SpeakerController@distinct');
Route::post('telephone-distinct', 'TelephoneController@distinct');
Route::post('projector-distinct', 'ProjectorController@distinct');

// Route resource models
Route::post('desktop-model', 'DesktopController@model');
Route::post('hard-disk-model', 'HardDiskController@model');
Route::post('headset-model', 'HeadsetController@model');
Route::post('keyboard-model', 'KeyboardController@model');
Route::post('monitor-model', 'MonitorController@model');
Route::post('mouse-model', 'MouseController@model');
Route::post('printer-model', 'PrinterController@model');
Route::post('scanner-model', 'ScannerController@model');
Route::post('ups-model', 'UninterruptiblePowerSupplyController@model');
Route::post('other-component-model', 'OtherComponentController@model');
Route::post('firewall-model', 'FirewallController@model');
Route::post('portable-hard-disk-model', 'PortableHardDiskController@model');
Route::post('network-switch-model', 'NetworkSwitchController@model');
Route::post('router-model', 'RouterController@model');
Route::post('speaker-model', 'SpeakerController@model');
Route::post('telephone-model', 'TelephoneController@model');
Route::post('projector-model', 'ProjectorController@model');

// Route resource others
Route::get('desktop-other/{desktopID}', 'DesktopController@other');
Route::get('hard-disk-other/{hardDiskID}', 'HardDiskController@other');
Route::get('headset-other/{headsetID}', 'HeadsetController@other');
Route::get('keyboard-other/{keyboardID}', 'KeyboardController@other');
Route::get('memory-other/{memoryID}', 'MemoryController@other');
Route::get('monitor-other/{monitorID}', 'MonitorController@other');
Route::get('mouse-other/{mouseID}', 'MouseController@other');
Route::get('printer-other/{printerID}', 'PrinterController@other');
Route::get('scanner-other/{scannerID}', 'ScannerController@other');
Route::get('software-other/{softwareID}', 'SoftwareController@other');
Route::get('ups-other/{upsID}', 'UninterruptiblePowerSupplyController@other');
Route::get('video-card-other/{videoCardID}', 'VideoCardController@other');
Route::get('other-component-other/{videoCardID}', 'OtherComponentController@other');
Route::get('firewall-other/{firewallID}', 'FirewallController@other');
Route::get('mac-other/{macID}', 'MacController@other');
Route::get('portable-hard-disk-other/{portableHardDiskID}', 'PortableHardDiskController@other');
Route::get('network-switch-other/{networkSwitchID}', 'NetworkSwitchController@other');
Route::get('router-other/{routerSwitchID}', 'RouterController@other');
Route::get('speaker-other/{speakerID}', 'SpeakerController@other');
Route::get('telephone-other/{telephoneID}', 'TelephoneController@other');
Route::get('projector-other/{projectorID}', 'ProjectorController@other');

// Other routes

/**
 * Workstation fetch by department except the existing
 * used at work-station-toolbar controller
*/
Route::get('work-station-department/{departmentID}/station/{workStationID}', 'WorkStationController@department');

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

// fetch all Mac with the specific type
Route::post('mac-processor', 'MacController@processor');
// fetch for vacant work stations
Route::post('work-station-vacant', 'WorkStationController@vacant');
// fetch workstation tag by workstation
Route::get('work-station-tag-workstation/{workstationID}', 'WorkStationTagController@workstation');
// other departments
Route::get('department-others/{departmentID}', 'DepartmentController@others');
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
Route::post('asset-tag-search-barcode', 'AssetTagController@searchBarcode');
Route::post('work-station-tag-search-barcode', 'WorkStationTagController@searchBarcode');
Route::post('asset-tag-available-swap', 'AssetTagController@availableSwap');
Route::put('asset-tag-swap/{assetTagID}', 'AssetTagController@swap');
Route::put('asset-tag-transfer-components/{workStationID}', 'AssetTagController@transferComponents');
Route::put('asset-tag-swap-components/{workStationID}/target/{swapWorkStationID}', 'AssetTagController@swapComponents');