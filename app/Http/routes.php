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
Route::resource('mouse', 'MouseController');
Route::resource('printer', 'PrinterController');
Route::resource('scanner', 'ScannerController');
Route::resource('software', 'SoftwareController');
Route::resource('ups', 'UninterruptiblePowerSupplyController');
Route::resource('video-card', 'VideoCardController');
Route::resource('other-component', 'OtherComponentController');

// Route Resource Paginations
Route::get('desktop-paginate', 'DesktopController@paginate');
Route::get('hard-disk-paginate', 'HardDiskController@paginate');
Route::get('headset-paginate', 'HeadsetController@paginate');
Route::get('keyboard-paginate', 'KeyboardController@paginate');
Route::get('memory-paginate', 'MemoryController@paginate');
Route::get('mouse-paginate', 'MouseController@paginate');
Route::get('printer-paginate', 'PrinterController@paginate');
Route::get('scanner-paginate', 'ScannerController@paginate');
Route::get('software-paginate', 'SoftwareController@paginate');
Route::get('ups-paginate', 'UninterruptiblePowerSupplyController@paginate');
Route::get('video-card-paginate', 'VideoCardController@paginate');
Route::get('other-component-paginate', 'OtherComponentController@paginate');