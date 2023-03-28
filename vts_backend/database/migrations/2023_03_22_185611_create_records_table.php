<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('records', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->date('next_date')->nullable();
            $table->integer('dose_no');
            $table->unsignedBigInteger('patient_id')->nullable();
            $table->unsignedBigInteger('dependent_id')->nullable();
            $table->unsignedBigInteger('vaccine_id');
            $table->unsignedBigInteger('hospital_id');
            $table->timestamps();

            $table->foreign('patient_id')->references('id')->on('patients');
            $table->foreign('dependent_id')->references('id')->on('dependents');
            $table->foreign('vaccine_id')->references('id')->on('vaccines');
            $table->foreign('hospital_id')->references('id')->on('hospitals');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('records');
    }
};
