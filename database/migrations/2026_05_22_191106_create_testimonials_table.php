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
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->enum('platform', [ 'SITE', 'FACEBOOK', 'INSTAGRAM', 'TWITTER', 'YOUTUBE', 'TIKTOK']);
            $table->text('message');
            $table->string('name');
            $table->string('title')->nullable();
            $table->string('handle')->nullable();
            $table->string('date');
            $table->enum('visibility', ['PUBLIC', 'UNLISTED'])->default('PUBLIC');
            $table->enum('status', ['PENDING', 'APPROVED', 'REJECTED'])->default('PENDING');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('testimonials');
    }
};
