<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
//Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::get('/blog', [BlogController::class,'index']);
Route::get('/blog/{id}', [BlogController::class,'show']);

Route::post('/blog', [BlogController::class,'store']);
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::put('/blog/{id}', [BlogController::class,'update']);
    Route::delete('/blog/{id}', [BlogController::class,'destroy']);

});
