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
        Schema::create('disease_vaccine', function (Blueprint $table) {
            $table->unsignedBigInteger('vaccine_id');
            $table->unsignedBigInteger('disease_id');

            $table->foreign('vaccine_id')->references('id')->on('vaccines');
            $table->foreign('disease_id')->references('id')->on('diseases');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('disease_vaccine');
    }
};
