<?php

namespace App\Http\Controllers;

use App\Models\Loans;
use App\Models\PaymentHistory;
use Illuminate\Http\Request;

class LoansController extends Controller{
  public function LoansList(){
    return Loans::orderBy('id','DESC')->get()->map(function($loan){
      
      $total_loan = Loans::CalculateTotal(7.9,$loan->months,$loan->total);

      return [
        'id'              => $loan->id,
        'name'            => $loan->name,
        'total_original'  => $loan->total,
        'remaining'       => $loan->remaining,
        'total'           => number_format($total_loan,2),
        'monthly_pay'     => number_format($total_loan / $loan->months,2),
        'months'          => $loan->months,
      ];
    });
  }

  public function AddLoan(Request $request){
    $request->validate([
      'name'      => 'required',
      'total'     => 'required',
      'months'    => 'required',
    ]);

    if ((Loans::where('name',$request->name)->where('remaining',">",0)->sum('total') + $request->total) > 80000) {
      return response('Loan Limit',500);
    }

    $total_loan = Loans::CalculateTotal(7.9, (int)$request->months, $request->total);
    $months = (int)$request->months;
    $add_loan = Loans::create([
      'name'                  => $request->name,
      'total'                 => $request->total,
      'total_with_interest'   => $total_loan,
      'remaining'             => $total_loan,
      'pay_per_month'         => $total_loan / $months,
      'months'                => $months,
    ]);

    if ($add_loan) {
      return response()->json([
        'status'  => 'success',
        'message' => 'Loan added successfully',
        'data'    => $add_loan
      ]);
    }

  }

  public function GetLoan(Request $request){
    $request->validate([
      'id'  => 'required',
    ]);

    $single_loan = Loans::where('id', $request->id);

    if ($single_loan->exists() == false) {
      return response('Loan not found',404);
    }

    $single_loan = $single_loan->first();


    return [
      'id'              => $single_loan->id,
      'name'            => $single_loan->name,
      'total'           => number_format($single_loan->total_with_interest, 2),
      'remaining'       => number_format($single_loan->remaining, 2),
      'months'          => $single_loan->months,
      'pay_per_month'   => $single_loan->pay_per_month,
      'related_loans'   => Loans::where('name', $single_loan->name)->get(),
      'payment_history' => PaymentHistory::where('loan_id',$request->id)->orderBy('id','DESC')->get()->map(function($history){
        return [
          'id'          => $history->loan_id,
          'payment'     => $history->payment,
          'remaining'   => $history->remaining,
          'refund'      => $history->refund,
          'created_at'  => date("Y-m-d H:i:s", strtotime($history->created_at)),
        ];
      }),
    ]; 

  }

  public function SubmitPayment(Request $request){
    $request->validate([
      'id'              => 'required',
      'paymentAmount'   => 'required',
    ]);

    $single_loan = Loans::where('id', $request->id);

    if ($single_loan->exists() == false) {
      return response('Loan not found', 404);
    }

    $single_loan = $single_loan->first();
    $refund = 0;
    if ($request->paymentAmount > $single_loan->remaining) {
      $remaining = 0;
      $refund = $request->paymentAmount - $single_loan->remaining; 
    }else{
      $remaining = $single_loan->remaining - $request->paymentAmount;
    }


    PaymentHistory::create([
      'loan_id'   => $request->id,
      'payment'   => $request->paymentAmount,
      'remaining' => $remaining,
      'refund'    => $refund,
    ]);

    Loans::where('id', $request->id)->update([
      'remaining' => $remaining,
    ]);

    $response = [
      'status'  => "Success",
      'leftover'=> number_format($refund,2),
    ];

    return response($response,200);
  }
}
