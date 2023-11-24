<?php

use App\Http\Controllers\LoansController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


// middleware


Route::get('loans/all', [LoansController::class, 'LoansList']);

Route::post('loans/add-new', [LoansController::class, 'AddLoan']);

Route::post('loans/get-loan', [LoansController::class, 'GetLoan']);

Route::post('loans/submit-payment', [LoansController::class, 'SubmitPayment']);