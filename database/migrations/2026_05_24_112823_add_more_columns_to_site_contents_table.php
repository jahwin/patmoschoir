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
        Schema::table('site_contents', function (Blueprint $table) {
            $table->string('donation_title')->nullable();
            $table->text('donation_description')->nullable();
            $table->text('donation_subdescription')->nullable();
            $table->text('card_title')->nullable();
            $table->text('card_description')->nullable();
            $table->json('amounts')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('site_contents', function (Blueprint $table) {
            //
        });
    }
};
