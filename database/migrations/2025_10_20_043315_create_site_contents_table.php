<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('site_contents', function (Blueprint $table) {
            $table->id();

            // General
            $table->string('site_name')->nullable();
            $table->string('site_color')->nullable();
            $table->string('site_logo')->nullable();
            $table->string('origin_domain')->nullable();

            // Contact
            $table->string('address')->nullable();
            $table->string('whatsapp_number')->nullable();
            $table->json('phones')->nullable();
            $table->json('emails')->nullable();
            $table->json('social_links')->nullable();

            // About Us
            $table->text('about_us')->nullable();
            $table->text('about_text')->nullable();
            $table->text('about_image')->nullable();
            $table->string('subimage')->nullable();
            $table->text('mission')->nullable();
            $table->text('vision')->nullable();
            $table->json('values')->nullable();
            $table->json('faqs')->nullable();

            // Legal & Policies
            $table->text('terms_and_conditions')->nullable();
            $table->text('privacy_policy')->nullable();
            $table->text('payment_terms')->nullable();

            // SEO & Footer
            $table->text('description')->nullable();
            $table->json('keywords')->nullable();
            $table->text('footer_text')->nullable();

            // Page Settings
            $table->string('services_page_title')->nullable();
            $table->string('services_page_subtitle')->nullable();
            $table->text('services_page_description')->nullable();
            $table->string('services_page_background_image')->nullable();

            // Home Page Backgrounds
            $table->string('home_about_background_image')->nullable();
            $table->string('home_music_background_image')->nullable();
            $table->string('home_videos_background_image')->nullable();
            $table->string('home_news_background_image')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('site_contents');
    }
};
