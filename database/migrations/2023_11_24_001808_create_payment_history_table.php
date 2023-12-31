<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void{
      Schema::create('payment_history', function (Blueprint $table) {
        $table->id();
        $table->integer('loan_id')->index();
        $table->decimal('payment',10,2);
        $table->decimal('remaining',10,2);
        $table->decimal('refund',10,2);
        $table->timestamps();
      });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment_history');
    }
};
