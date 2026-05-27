<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\Events;
use App\Models\Gallery;
use App\Models\JoinUs;
use App\Models\Playlist;
use App\Models\SiteContent;
use App\Models\Streaming;
use App\Models\Testimonials;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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
            'storyline_eyebrow' => $siteContent?->storyline_eyebrow,
            'storyline_title' => $siteContent?->storyline_title,
            'poster' => $siteContent?->about_poster ? Storage::url($siteContent->about_poster) : null,
        ];

        $donation = [
            'title' => $siteContent?->donation_title,
            'description' => $siteContent?->donation_description,
            'subdescription' => $siteContent?->donation_subdescription,
            'card_title' => $siteContent?->card_title,
            'card_description' => $siteContent?->card_description,
            'amounts' => collect($siteContent?->amounts ?? [])
                ->filter(fn ($item) => isset($item['amount']) && is_numeric($item['amount']) && (float) $item['amount'] > 0)
                ->map(fn ($item) => [
                    'amount' => (float) $item['amount'],
                    'currency' => in_array($item['currency'] ?? '', ['USD', 'RWF'], true)
                        ? $item['currency']
                        : 'USD',
                ])
                ->values()
                ->all(),
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
            ->filter(fn (array $album) => filled($album['title']))
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
            'donation',
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
            'storyline_eyebrow' => $siteContent?->storyline_eyebrow,
            'storyline_title' => $siteContent?->storyline_title,
            'poster' => $siteContent?->about_poster ? Storage::url($siteContent->about_poster) : null,
        ];

        $galleries = Gallery::query()
            ->where('visibility', 'Public')
            ->orderByDesc('year')
            ->get()
            ->map(function (Gallery $gallery) {
                return [
                    'id' => $gallery->id,
                    'title' => $gallery->title,
                    'image' => $gallery->cover ? Storage::url($gallery->cover) : null,
                    'images' => collect($gallery->images ?? [])
                        ->filter()
                        ->map(fn ($path) => Storage::url($path))
                        ->values()
                        ->all(),
                ];
            })
            ->values();

        return Inertia::render('about', compact('about', 'galleries'));
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

    public function submitContact(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        Contact::create($validated);

        return back();
    }

    public function submitSubscribe(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'country' => ['required', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:255'],
            'address' => ['nullable', 'string', 'max:500'],
        ]);

        JoinUs::create([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'country' => $validated['country'],
            'city' => $validated['city'] ?? null,
            'message' => $validated['address'] ?? '',
        ]);

        return back();
    }

    public function submitMinistryJoin(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
        ]);

        $nameParts = preg_split('/\s+/', trim($validated['full_name']), 2);

        JoinUs::create([
            'first_name' => $nameParts[0],
            'last_name' => $nameParts[1] ?? '',
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'country' => null,
            'city' => null,
            'message' => 'Ministry partnership inquiry',
        ]);

        return back();
    }

    public function submitTestimonial(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        Testimonials::create([
            'name' => $validated['name'],
            'message' => $validated['message'],
            'platform' => 'SITE',
            'status' => 'PENDING',
            'date' => now()->toDateString(),
        ]);

        return response()->json([
            'message' => 'Thank you! Your testimonial has been submitted for review.',
        ], 201);
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
