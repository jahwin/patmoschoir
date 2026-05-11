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
            $table->string('services_page_title')->nullable()->after('subimage');
            $table->string('services_page_subtitle')->nullable()->after('services_page_title');
            $table->text('services_page_description')->nullable()->after('services_page_subtitle');
            $table->string('services_page_background_image')->nullable()->after('services_page_description');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('site_contents', function (Blueprint $table) {
            $table->dropColumn([
                'services_page_title',
                'services_page_subtitle',
                'services_page_description',
                'services_page_background_image',
            ]);
        });
    }
};
