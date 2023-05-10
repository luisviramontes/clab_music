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
    return view('welcome');
});

//OLVIDE CONTRASEÑA

/*
Route::get('/reset_password', function () {
    return view('auth/reset_password');
});

Route::get('password/email', 'Auth\PasswordController@getEmail');
Route::post('password/email', 'Auth\PasswordController@postEmail');

Route::get('password/reset/{token}', 'Auth\PasswordController@getReset');
Route::post('password/reset', 'Auth\PasswordController@postReset');
*/

 

// Authentication routes...
Route::get('auth/login', 'Auth\AuthController@getLogin');
Route::post('auth/login', ['as' =>'auth/login', 'uses' => 'Auth\AuthController@postLogin']);
Route::get('auth/logout', ['as' => 'auth/logout', 'uses' => 'Auth\AuthController@getLogout']);

//welcome
Route::get('welcome', 'welcomeController@index');

//PRUEBAS
Route::get('pruebas', 'pruebasController@index');

//RECUPERAR CONTRASEÑA
Route::get('password/email', 'passwordsController@getEmail');
Route::post('password/email', 'passwordsController@postEmail');
Route::get('password/reset/{token}', 'passwordsController@getReset');
Route::post('password/reset', 'passwordsController@postReset');

// Registration routes...
/*
Route::get('auth/register', 'Auth\AuthController@getRegister');
Route::post('auth/register', ['as' => 'auth/register', 'uses' => 'Auth\AuthController@postRegister']);
*/
Route::get('auth/register', 'userController@getRegister');
Route::post('auth/register', 'userController@postRegister');
Route::get('activar_cuenta/{id}', 'userController@activar_cuenta');


//suscriptores admin
Route::resource('reproductor_admin', 'reproductorController');
Route::get('obtener_lista_reproduccion', 'respuestasController@lista_reproduccion');
