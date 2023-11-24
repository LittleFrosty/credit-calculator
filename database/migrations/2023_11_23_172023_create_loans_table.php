<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
      Schema::create('loans', function (Blueprint $table) {
        $table->id();
        $table->string('name',256)->index();
        $table->decimal('total', 10, 2);
        $table->decimal('total_with_interest', 10, 2);
        $table->decimal('remaining', 10, 2);
        $table->decimal('pay_per_month',10,2);
        $table->integer('months');
        $table->timestamps();
      });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('loans');
    }
};
