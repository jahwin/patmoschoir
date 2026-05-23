<?php

namespace App\Http\Controllers;

use App\Models\Events;
use App\Models\Gallery;
use App\Models\Playlist;
use App\Models\SiteContent;
use App\Models\Streaming;
use App\Models\Testimonials;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class WebController extends Controller
{
    public function index()
    {
        $siteContent = SiteContent::first();

        $hero = [
            'title' => $siteContent?->hero_title,
            'subtitle' => $siteContent?->hero_subtitle,
            'description' => $siteContent?->hero_description,
            'subdescription' => $siteContent?->hero_subdescription,
            'background_images' => collect($siteContent?->hero_background_images ?? [])
                ->filter()
                ->map(fn ($path) => Storage::url($path))
                ->values()
                ->all(),
        ];

        $about = [
            'title' => $siteContent?->about_title,
            'text' => $siteContent?->about_text,
            'image' => $siteContent?->about_image ? Storage::url($siteContent->about_image) : null,
            'subimage' => $siteContent?->subimage ? Storage::url($siteContent->subimage) : null,
            'mission' => $siteContent?->mission,
            'vision' => $siteContent?->vision,
            'values' => $siteContent?->values ?? [],
            'storyline' => $siteContent?->storyline ?? [],
            'poster' => $siteContent?->about_poster ? Storage::url($siteContent->about_poster) : null,
        ];

        $stream = Streaming::query()
            ->where('visibility', 'PUBLIC')
            ->where('date', '>=', now()->toDateString())
            ->orderBy('date')
            ->first();

        if ($stream) {
            $stream = [
                'id' => $stream->id,
                'title' => $stream->title,
                'description' => $stream->description,
                'cover' => $stream->cover ? Storage::url($stream->cover) : null,
                'date' => $stream->date,
                'start_time' => $stream->start_time,
                'end_time' => $stream->end_time,
                'location' => $stream->location,
                'link' => $stream->link,
                'stream_url' => $stream->stream_url,
            ];
        }

        $albums = Playlist::query()
            ->orderByDesc('year')
            ->get()
            ->map(fn (Playlist $album) => [
                'id' => $album->id,
                'year' => (int) ($album->year ?? 0),
                'title' => $album->name ?? '',
                'cover' => $album->image ? Storage::url($album->image) : null,
                'trackCount' => (int) ($album->tracks ?? 0),
                'description' => $album->description,
                'links' => $this->mapPlaylistLinks($album->links),
            ])
            ->filter(fn (array $album) => filled($album['title']) && filled($album['cover']))
            ->values();

        $testimonials = Testimonials::query()
            ->where('visibility', 'PUBLIC')
            ->where('status', 'APPROVED')
            ->orderByDesc('created_at')
            ->get()
            ->map(fn (Testimonials $t) => [
                'id' => $t->id,
                'platform' => $this->mapTestimonialPlatform($t->platform),
                'name' => $t->name,
                'handle' => $t->handle ?: ($t->title ? $t->title : null),
                'text' => $t->message,
                'date' => $t->date,
            ])
            ->values();

        $contacts = [
            'address' => $siteContent?->address,
            'phones' => $siteContent?->phones ?? [],
            'emails' => $siteContent?->emails ?? [],
            'social_links' => $siteContent?->social_links ?? [],
        ];

        $galleries = Gallery::query()
            ->where('visibility', 'Public')
            ->orderByDesc('year')
            ->get()
            ->map(function (Gallery $gallery) {
                return [
                    'id' => $gallery->id,
                    'title' => $gallery->title,
                    'description' => $gallery->description,
                    'image' => $gallery->cover ? Storage::url($gallery->cover) : null,
                    'images' => collect($gallery->images ?? [])
                        ->filter()
                        ->map(fn ($path) => Storage::url($path))
                        ->values()
                        ->all(),
                    'year' => (int) ($gallery->year ?? 0),
                ];
            })
            ->filter(fn (array $gallery) => filled($gallery['image']) && $gallery['year'] > 0)
            ->sortByDesc('year')
            ->values();

        $events = $this->getEventsWithPricings();

        return Inertia::render('index', compact(
            'events',
            'hero',
            'about',
            'stream',
            'albums',
            'testimonials',
            'contacts',
            'galleries',
        ));
    }

    public function about()
    {
        $siteContent = SiteContent::first();
        $about = [
            'title' => $siteContent?->about_title,
            'text' => $siteContent?->about_text,
            'image' => $siteContent?->about_image ? Storage::url($siteContent->about_image) : null,
            'subimage' => $siteContent?->subimage ? Storage::url($siteContent->subimage) : null,
            'mission' => $siteContent?->mission,
            'vision' => $siteContent?->vision,
            'values' => $siteContent?->values ?? [],
            'storyline' => $siteContent?->storyline ?? [],
            'poster' => $siteContent?->about_poster ? Storage::url($siteContent->about_poster) : null,
        ];

        return Inertia::render('about', compact('about'));
    }

    public function events()
    {
        $events = $this->getEventsWithPricings();

        return Inertia::render('events', compact('events'));
    }

    private function getEventsWithPricings(): \Illuminate\Support\Collection
    {
        return Events::where('visibility', 'Public')
            ->orderBy('date')
            ->get()
            ->map(function (Events $event) {
                if ($event->image) {
                    $event->image = Storage::url($event->image);
                }
                $event->pricings = $this->getEventPricing($event->event_id);

                return $event;
            });
    }

    private function getEventPricing(?string $event_id): array
    {
        if (!$event_id) {
            return [];
        }

        try {
            $baseUrl = rtrim(config('app.api_base_url'), '/');
            $apiKey = config('app.api_key');
            $response = Http::withHeaders([
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
            ])->get("{$baseUrl}/api/v1/admin/channel/get/api/key/event/pricing/{$event_id}", [
                'api_key' => $apiKey,
            ]);

            if ($response->successful()) {
                $data = $response->json();

                return isset($data['return']) && is_array($data['return']) ? $data['return'] : [];
            }
        } catch (\Exception $e) {
            return [];
        }

        return [];
    }

    /**
     * @param  array<int, array{platform?: string, url?: string}>|null  $links
     * @return array<string, string>
     */
    private function mapPlaylistLinks(?array $links): array
    {
        if (!$links) {
            return [];
        }

        $platformKeys = [
            'SPOTIFY' => 'spotify',
            'APPLE_MUSIC' => 'appleMusic',
            'YOUTUBE' => 'youtube',
            'SOUNDCLOUD' => 'soundcloud',
            'TIDAL' => 'tidal',
            'DEEZER' => 'deezer',
            'AMAZON_MUSIC' => 'amazonMusic',
            'AUDIOMACK' => 'audiomack',
            'BOOMPLAY' => 'boomplay',
        ];

        $mapped = [];

        foreach ($links as $link) {
            $platform = strtoupper($link['platform'] ?? '');
            $url = $link['url'] ?? null;

            if (!$url) {
                continue;
            }

            $key = $platformKeys[$platform] ?? strtolower($platform);
            $mapped[$key] = $url;
        }

        return $mapped;
    }

    private function mapTestimonialPlatform(string $platform): string
    {
        return match (strtoupper($platform)) {
            'FACEBOOK' => 'facebook',
            'INSTAGRAM' => 'instagram',
            'TWITTER' => 'x',
            'YOUTUBE' => 'youtube',
            'TIKTOK' => 'instagram',
            default => 'website',
        };
    }

    public function contact()
    {
        return Inertia::render('contact');
    }

    public function notFound()
    {
        return Inertia::render('404');
    }

    public function privacyPolicy()
    {
        return Inertia::render('privacy_policy');
    }

    // public function termsAndConditions()
    // {
    //     return Inertia::render('terms_conditions');
    // }

    // public function paymentTerms()
    // {
    //     return Inertia::render('payment_terms');
    // }

    /**
     * Convert a slug to title case format
     * Example: "male-artist-of-the-year" -> "Male Artist Of The Year"
     */
    private function formatSlugToTitle(string $slug): string
    {
        return ucwords(str_replace('-', ' ', $slug));
    }
}
