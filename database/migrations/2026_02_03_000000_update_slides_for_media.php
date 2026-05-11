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
        Schema::table('slides', function (Blueprint $table) {
            $table->string('media_type')->default('image')->after('image');
            $table->string('video_url')->nullable()->after('media_type');
            $table->dropColumn([
                'title',
                'text',
                'button_text',
                'button_link',
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('slides', function (Blueprint $table) {
            $table->string('title');
            $table->text('text')->nullable();
            $table->string('button_text')->nullable();
            $table->string('button_link')->nullable();
            $table->dropColumn(['media_type', 'video_url']);
        });
    }
};
