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
            $table->string('site_logo')->nullable();

            // hero
            $table->json('hero_background_images')->nullable();
            $table->text('hero_title')->nullable();
            $table->text('hero_subtitle')->nullable();
            $table->text('hero_description')->nullable();
            $table->text('hero_subdescription')->nullable();

            // About Us
            $table->text('about_title')->nullable();
            $table->text('about_text')->nullable();
            $table->text('about_image')->nullable();
            $table->string('subimage')->nullable();
            $table->text('mission')->nullable();
            $table->text('vision')->nullable();
            $table->json('values')->nullable();
            $table->json('storyline')->nullable();
            $table->text('about_poster')->nullable();

            // Contact
            $table->string('address')->nullable();
            $table->json('phones')->nullable();
            $table->json('emails')->nullable();
            $table->json('social_links')->nullable();

            // Legal & Policies
            $table->text('terms_and_conditions')->nullable();
            $table->text('privacy_policy')->nullable();
            $table->text('payment_terms')->nullable();

            // SEO & Footer
            $table->text('description')->nullable();
            $table->json('keywords')->nullable();
            $table->text('footer_text')->nullable();

            // Home Page Backgrounds
            $table->string('home_about_background_image')->nullable();
            $table->string('home_events_background_image')->nullable();
            $table->string('home_gallery_background_image')->nullable();
            $table->string('home_footer_background_image')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('site_contents');
    }
};
