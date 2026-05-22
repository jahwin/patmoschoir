<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteContent extends Model
{
    protected $fillable = [
        // General
        'site_name',
        'site_logo',

        // Hero
        'hero_background_images',
        'hero_title',
        'hero_subtitle',
        'hero_description',
        'hero_subdescription',

        // About Us
        'about_title',
        'about_text',
        'about_image',
        'subimage',
        'mission',
        'vision',
        'values',
        'storyline',
        'about_poster',

        // Contact
        'address',
        'phones',
        'emails',
        'social_links',

        // Legal & Policies
        'terms_and_conditions',
        'privacy_policy',
        'payment_terms',

        // SEO & Footer
        'description',
        'keywords',
        'footer_text',

        // Home Page Backgrounds
        'home_about_background_image',
        'home_events_background_image',
        'home_gallery_background_image',
        'home_footer_background_image',
    ];

    protected $casts = [
        'hero_background_images' => 'array',
        'values' => 'array',
        'storyline' => 'array',
        'phones' => 'array',
        'emails' => 'array',
        'social_links' => 'array',
        'keywords' => 'array',
    ];
}
