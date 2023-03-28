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
        Schema::create('vaccines', function (Blueprint $table) {
            $table->id();
            $table->string('vaccine_name');
            $table->string('manufacturer');
            $table->string('contains');
            $table->integer('dosage');
            $table->string('age_range');
            $table->integer('duration1')->nullable();
            $table->integer('duration2')->nullable();
            $table->integer('duration3')->nullable();
            $table->integer('validity_duration')->nullable();
            $table->decimal('price', 8,2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vaccines');
    }
};
