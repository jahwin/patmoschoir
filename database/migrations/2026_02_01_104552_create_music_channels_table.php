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
        Schema::create('music_channels', function (Blueprint $table) {
            $table->id();
            $table->string('logo')->nullable();
            $table->text('link')->nullable();
            $table->string('button_text')->default('Play');
            $table->string('service_name')->nullable();
            $table->integer('rank')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('music_channels');
    }
};
