<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Loans extends Model{
  use HasFactory;
  protected $table = 'loans';
  protected $fillable = [
    'name',
    'total',
    'months',
    'pay_per_month',
    'total_with_interest',
    'remaining'
  ];

  public static function CalculateTotal(float $interest_rate, int $months, float $loan_total):float{
    $total_years = $months / 12;
    $total_loan = $loan_total;


    for ($i = 0; $i < $total_years; $i++) {
      $total_loan = $total_loan + ($total_loan * ($interest_rate / 100));
    }

    return $total_loan;
  }
}
