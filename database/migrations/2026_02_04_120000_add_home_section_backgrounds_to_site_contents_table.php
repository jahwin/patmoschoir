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
            $table->string('home_about_background_image')->nullable()->after('services_page_background_image');
            $table->string('home_music_background_image')->nullable()->after('home_about_background_image');
            $table->string('home_videos_background_image')->nullable()->after('home_music_background_image');
            $table->string('home_news_background_image')->nullable()->after('home_videos_background_image');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('site_contents', function (Blueprint $table) {
            $table->dropColumn([
                'home_about_background_image',
                'home_music_background_image',
                'home_videos_background_image',
                'home_news_background_image',
            ]);
        });
    }
};
