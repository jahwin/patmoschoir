<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteContent extends Model
{
    protected $fillable = [
        'site_logo',
        'site_color',
        'site_name',
        'social_links',
        'address',
        'whatsapp_number',
        'phones',
        'emails',
        'faqs',
        'about_text',
        'about_us',
        'mission',
        'vision',
        'values',
        'terms_and_conditions',
        'privacy_policy',
        'keywords',
        'description',
        'payment_terms',
        'about_image',
        'footer_text',
        'subimage',
        'origin_domain',
        'services_page_title',
        'services_page_subtitle',
        'services_page_description',
        'services_page_background_image',
        'home_about_background_image',
        'home_music_background_image',
        'home_videos_background_image',
        'home_news_background_image',
    ];

    protected $casts = [
        'social_links' => 'array',
        'phones' => 'array',
        'emails' => 'array',
        'faqs' => 'array',
        'keywords' => 'array',
        'values' => 'array',
    ];
}
