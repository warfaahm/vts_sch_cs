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
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('patient_id')->nullable();
            $table->unsignedBigInteger('dependent_id')->nullable();
            $table->date('date');
            $table->enum('time', ['9.1', '9.2', '10.1', '10.2', '11.1', '11.2', '12.1', '12.2', '14.1', '14.2', '15.1', '15.2', '16.1', '16.2']);
            $table->integer("dose_no");
            $table->enum('status', ['Confirmed', 'No_Show', 'Pending', 'Completed', 'Please_Reschedule'])->default('Pending');
            $table->unsignedBigInteger('hospital_id');
            $table->unsignedBigInteger('vaccine_id');
            $table->timestamps();

            $table->foreign('patient_id')->references('id')->on('patients');
            $table->foreign('dependent_id')->references('id')->on('dependents');
            $table->foreign('hospital_id')->references('id')->on('hospitals');
            $table->foreign('vaccine_id')->references('id')->on('vaccines');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('appointments');
    }
};
