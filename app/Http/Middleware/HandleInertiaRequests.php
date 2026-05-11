<?php

namespace App\Http\Middleware;

use App\Models\SiteContent;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        $siteContent = SiteContent::latest()->first();

        if (!$siteContent) {
            $siteContent = null;
        }

        if ($siteContent && $siteContent->site_logo) {
            $siteContent->site_logo = Storage::url($siteContent->site_logo);
        }

        if ($siteContent && $siteContent->about_image) {
            $siteContent->about_image = Storage::url($siteContent->about_image);
        }

        if ($siteContent && $siteContent->subimage) {
            $siteContent->subimage = Storage::url($siteContent->subimage);
        }

        if ($siteContent && $siteContent->home_about_background_image) {
            $siteContent->home_about_background_image = Storage::url($siteContent->home_about_background_image);
        }

        if ($siteContent && $siteContent->home_music_background_image) {
            $siteContent->home_music_background_image = Storage::url($siteContent->home_music_background_image);
        }

        if ($siteContent && $siteContent->home_videos_background_image) {
            $siteContent->home_videos_background_image = Storage::url($siteContent->home_videos_background_image);
        }

        if ($siteContent && $siteContent->home_news_background_image) {
            $siteContent->home_news_background_image = Storage::url($siteContent->home_news_background_image);
        }

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'siteContent' => $siteContent,
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
            ],
            'metadata' => [
                'title' => $siteContent?->site_name ?? '',
                'description' => $siteContent?->description ?? '',
                'keywords' => $siteContent && $siteContent->keywords ? (is_array($siteContent->keywords) ? implode(',', $siteContent->keywords) : $siteContent->keywords) : '',
                'image' => $siteContent?->site_logo ?? '',
                'favicon' => $siteContent?->site_logo ?? '',
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
