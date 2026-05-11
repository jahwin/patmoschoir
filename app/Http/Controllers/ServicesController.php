<?php

namespace App\Http\Controllers;

use App\Models\Services;
use App\Models\SiteContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ServicesController extends Controller
{
    public function index()
    {
        $services = Services::all();

        if ($services->isEmpty()) {
            return Inertia::render('404');
        }

        $services = $services->map(function ($service) {
            $service->image = Storage::url($service->image);
            return $service;
        });

        // Get services page settings from site content
        $siteContent = SiteContent::latest()->first();
        $servicesPageSettings = null;

        if ($siteContent) {
            $servicesPageSettings = [
                'title' => $siteContent->services_page_title,
                'subtitle' => $siteContent->services_page_subtitle,
                'description' => $siteContent->services_page_description,
                'backgroundImage' => $siteContent->services_page_background_image
                    ? Storage::url($siteContent->services_page_background_image)
                    : null,
            ];
        }

        return Inertia::render('services', compact('services', 'servicesPageSettings'));
    }
}
