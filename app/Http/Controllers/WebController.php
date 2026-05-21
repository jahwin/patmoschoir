<?php

namespace App\Http\Controllers;
use App\Models\Events;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class WebController extends Controller
{
    public function index()
    {
        $events = $this->getEventsWithPricings();
        return Inertia::render('index', compact('events'));
    }

    public function about()
    {
        return Inertia::render('about');
    }

    public function events()
    {
        $events = $this->getEventsWithPricings();
        return Inertia::render('events', compact('events'));
    }

    public function videos()
    {
        $videos = Video::latest()->get();

        if ($videos && $videos->count() > 0) {
            $videos = $videos->map(function ($video) {
                if ($video->image) {
                    $video->image = Storage::url($video->image);
                }
                return $video;
            });
        }

        return Inertia::render('videos', compact('videos'));
    }

    public function music()
    {
        $music = Music::latest()->take(6)->get();

        if ($music && $music->count() > 0) {
            $music = $music->map(function ($item) {
                if ($item->image) {
                    $item->image = Storage::url($item->image);
                }
                return $item;
            });
        }

        $videos = Video::latest()->take(6)->get();

        if ($videos && $videos->count() > 0) {
            $videos = $videos->map(function ($video) {
                if ($video->image) {
                    $video->image = Storage::url($video->image);
                }
                return $video;
            });
        }

        return Inertia::render('music', compact('music', 'videos'));
    }

    public function musicChannels()
    {
        $channels = MusicChannel::orderBy('rank', 'asc')->get();

        if ($channels && $channels->count() > 0) {
            $channels = $channels->map(function ($channel) {
                if ($channel->logo) {
                    $channel->logo = Storage::url($channel->logo);
                }
                return $channel;
            });
        }

        return Inertia::render('music-channels', compact('channels'));
    }

    public function event($slug)
    {
        $event = Events::where('slug', $slug)->firstOrFail();

        if ($event->image) {
            $event->image = Storage::url($event->image);
        }

        $pricings = $this->getEventPricing($event->event_id);

        return Inertia::render('event.$slug', [
            'event' => $event,
            'pricings' => $pricings,
            'slug' => $slug,
        ]);
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

    public function termsAndConditions()
    {
        return Inertia::render('terms_conditions');
    }

    public function paymentTerms()
    {
        return Inertia::render('payment_terms');
    }
 
    /**
     * Convert a slug to title case format
     * Example: "male-artist-of-the-year" -> "Male Artist Of The Year"
     *
     * @param string $slug
     * @return string
     */
    private function formatSlugToTitle(string $slug): string
    {
        // Replace hyphens with spaces and capitalize each word
        return ucwords(str_replace('-', ' ', $slug));
    }
}
