<?php

use App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::group([ 'middleware' => 'api', 'prefix' => 'auth' ], function ($router) {

    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::get('profile', 'AuthController@profile');

});

Route::group(['middleware' => 'api'], function ($router) {

    //ContactController
    Route::resource('/contact', 'ContactController')->except([
        'show', 'update'
    ]);
    Route::get('/contact/search', 'ContactController@search');
});
