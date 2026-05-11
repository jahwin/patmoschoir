<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\HandlesSeoMetadata;
use App\Models\Blogs;
use App\Models\Contacts;
use App\Models\Gallery;
use App\Models\MinistrySubmission;
use App\Models\Music;
use App\Models\MusicChannel;
use App\Models\Services;
use App\Models\Show;
use App\Models\Slides;
use App\Models\Subscriptions;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class WebController extends Controller
{
    public function index()
    {
        $blogs = Blogs::latest()->take(3)->get();

        if ($blogs && $blogs->count() > 0) {
            $blogs = $blogs->map(function ($blog) {
                $blog->image = Storage::url($blog->image);
                $blog->read_time = $blog->getReadTime();
                $blog->word_count = $blog->getWordCount();
                return $blog;
            });
        }

        $services = Services::latest()->take(3)->get();

        if ($services && $services->count() > 0) {
            $services = $services->map(function ($service) {
                if ($service->image) {
                    $service->image = Storage::url($service->image);
                }
                return $service;
            });
        }

        $slides = Slides::latest()->get();

        if ($slides && $slides->count() > 0) {
            $slides = $slides->map(function ($slide) {
                if ($slide->image) {
                    $slide->image = Storage::url($slide->image);
                }
                return $slide;
            });
        }

        $music = Music::latest()->get();

        if ($music && $music->count() > 0) {
            $music = $music->map(function ($item) {
                if ($item->image) {
                    $item->image = Storage::url($item->image);
                }
                return $item;
            });
        }

        $videos = Video::latest()->get();

        if ($videos && $videos->count() > 0) {
            $videos = $videos->map(function ($video) {
                if ($video->image) {
                    $video->image = Storage::url($video->image);
                }
                return $video;
            });
        }

        $shows = Show::orderBy('show_date')->get();

        $galleries = Gallery::latest()->get();

        $galleries = $galleries->map(function ($gallery) {
            if ($gallery->image) {
                $gallery->image = Storage::url($gallery->image);
            }

            if ($gallery->images && is_array($gallery->images)) {
                $gallery->images = array_map(function ($image) {
                    return Storage::url($image);
                }, $gallery->images);
            }

            return $gallery;
        });


        return Inertia::render('index', compact('blogs', 'services', 'slides', 'music', 'videos', 'shows', 'galleries'));
    }

    public function about()
    {
        $galleries = Gallery::latest()->get();

        $galleries = $galleries->map(function ($gallery) {
            if ($gallery->image) {
                $gallery->image = Storage::url($gallery->image);
            }

            if ($gallery->images && is_array($gallery->images)) {
                $gallery->images = array_map(function ($image) {
                    return Storage::url($image);
                }, $gallery->images);
            }

            return $gallery;
        });

        return Inertia::render('about', compact('galleries'));
    }

    public function faq()
    {
        return Inertia::render('faq');
    }

    public function votings()
    {
        return Inertia::render('votings');
    }

    public function voting(Request $request, $slug)
    {
        try {
            $apiUrl = 'https://api-watch.wecodefy.com/api/v1/voting/get/voting/session';

            $response = Http::post($apiUrl, [
                'voting_session_slag' => $slug,
                'query' => ""
            ]);

            if (!$response->successful()) {
                return Inertia::render('voting.$slug', [
                    'slug' => $slug,
                    'votingData' => null,
                    'error' => 'Failed to fetch voting session data. Please try again later.'
                ]);
            }

            $data = $response->json();

            if (isset($data['status']) && $data['status'] === 'ok' && isset($data['return'])) {
                $votingData = $data['return'];

                // Process and format image URLs for voting session
                if (isset($votingData['logo']) && $votingData['logo'] && !str_starts_with($votingData['logo'], 'http')) {
                    $votingData['logo'] = "https://cagura-assets.b-cdn.net/assets/uploaded/{$votingData['logo']}";
                }
                if (isset($votingData['logo']) && $votingData['logo'] && !str_starts_with($votingData['logo'], 'http')) {
                    $votingData['logo'] = "https://cagura-assets.b-cdn.net/assets/uploaded/{$votingData['logo']}";
                }

                // Process categories and their participants - format image URLs
                if (isset($votingData['categories']) && is_array($votingData['categories'])) {
                    foreach ($votingData['categories'] as &$category) {
                        if (isset($category['participants']) && is_array($category['participants'])) {
                            foreach ($category['participants'] as &$participant) {
                                if (isset($participant['image']) && $participant['image'] && !str_starts_with($participant['image'], 'http')) {
                                    $participant['image'] = "https://cagura-assets.b-cdn.net/assets/uploaded/{$participant['image']}";
                                }
                            }
                        }
                    }
                }

                // Set SEO metadata based on voting session data
                $votingTitle = $votingData['title'] ?? null;
                $votingDescription = $votingData['description'] ?? $votingData['short_description'] ?? null;

                // Format image URL for SEO (use CDN URL if not already a full URL)
                $imageUrl = $votingData['logo'] ?? $votingData['logo'] ?? $votingData['banner_image'] ?? null;
                if ($imageUrl && !str_starts_with($imageUrl, 'http')) {
                    $imageUrl = "https://cagura-assets.b-cdn.net/assets/uploaded/{$imageUrl}";
                }

                // Build keywords - merge with default site keywords
                $keywords = [];
                if ($votingTitle) {
                    $keywords[] = $votingTitle;
                }
                $keywords[] = 'voting';
                $keywords[] = 'contest';
                $keywords[] = 'poll';
                if (isset($votingData['category_name'])) {
                    $keywords[] = $votingData['category_name'];
                }

                // Share SEO metadata via Inertia
                Inertia::share('customMetadata', [
                    'title' => $votingTitle,
                    'description' => $votingDescription,
                    'keywords' => implode(', ', $keywords),
                    'image' => $imageUrl,
                    'url' => $request->url(),
                    'type' => 'website'
                ]);

                return Inertia::render('voting.$slug', [
                    'slug' => $slug,
                    'votingData' => $votingData,
                    'error' => null
                ]);
            } else {
                return Inertia::render('voting.$slug', [
                    'slug' => $slug,
                    'votingData' => null,
                    'error' => $data['message'] ?? 'Voting session not found'
                ]);
            }
        } catch (\Exception $e) {
            return Inertia::render('voting.$slug', [
                'slug' => $slug,
                'votingData' => null,
                'error' => 'An error occurred while fetching voting session data.'
            ]);
        }
    }

    public function category(Request $request, $slug, $sessionId)
    {
        try {
            $apiUrl = 'https://api-watch.wecodefy.com/api/v1/voting/get/voting/category';

            $response = Http::post($apiUrl, [
                'voting_category_slag' => $slug,
                'voting_session_id' => $sessionId
            ]);

            if (!$response->successful()) {
                return Inertia::render('category.$slug', [
                    'slug' => $slug,
                    'sessionId' => $sessionId,
                    'categoryData' => null,
                    'error' => 'Failed to fetch category data. Please try again later.'
                ]);
            }

            $data = $response->json();

            if (isset($data['status']) && $data['status'] === 'ok' && isset($data['return'])) {
                $categoryData = $data['return'];

                // Process and format image URLs for category
                if (isset($categoryData['logo']) && $categoryData['logo'] && !str_starts_with($categoryData['logo'], 'http')) {
                    $categoryData['logo'] = "https://cagura-assets.b-cdn.net/assets/uploaded/{$categoryData['logo']}";
                }
                if (isset($categoryData['logo']) && $categoryData['logo'] && !str_starts_with($categoryData['logo'], 'http')) {
                    $categoryData['logo'] = "https://cagura-assets.b-cdn.net/assets/uploaded/{$categoryData['logo']}";
                }

                // Process categories array if it exists (for IVotingCategory structure)
                if (isset($categoryData['categories']) && is_array($categoryData['categories'])) {
                    foreach ($categoryData['categories'] as &$category) {
                        if (isset($category['participants']) && is_array($category['participants'])) {
                            foreach ($category['participants'] as &$participant) {
                                if (isset($participant['image']) && $participant['image'] && !str_starts_with($participant['image'], 'http')) {
                                    $participant['image'] = "https://cagura-assets.b-cdn.net/assets/uploaded/{$participant['image']}";
                                }
                            }
                        }
                    }
                }

                // Process participants array if it exists (direct participants in category)
                if (isset($categoryData['participants']) && is_array($categoryData['participants'])) {
                    foreach ($categoryData['participants'] as &$participant) {
                        if (isset($participant['image']) && $participant['image'] && !str_starts_with($participant['image'], 'http')) {
                            $participant['image'] = "https://cagura-assets.b-cdn.net/assets/uploaded/{$participant['image']}";
                        }
                    }
                }

                // Set SEO metadata based on category data
                $categoryName = $categoryData['name'] ?? $this->formatSlugToTitle($slug);
                // Format category name from slug if it's still in slug format
                if ($categoryName === $slug || str_contains($categoryName, '-')) {
                    $categoryName = $this->formatSlugToTitle($categoryName);
                }

                // Update categoryData with formatted name for frontend use
                if (isset($categoryData['categories']) && is_array($categoryData['categories']) && count($categoryData['categories']) > 0) {
                    $categoryData['categories'][0]['name'] = $categoryName;
                }
                $categoryData['name'] = $categoryName;

                $description = $categoryData['description'] ?? "View participants in the {$categoryName} category";

                // Try to get an image from the first participant or voting session
                $imageUrl = null;
                if (!$imageUrl && isset($categoryData['logo'])) {
                    $imageUrl = $categoryData['logo'];
                }
                if ($imageUrl && !str_starts_with($imageUrl, 'http')) {
                    $imageUrl = "https://cagura-assets.b-cdn.net/assets/uploaded/{$imageUrl}";
                }

                // Build keywords
                $keywords = ['voting', $categoryName, 'category', 'participants', 'contest'];
                if (isset($categoryData['voting_session_title'])) {
                    $keywords[] = $categoryData['voting_session_title'];
                }
                if (isset($categoryData['title'])) {
                    $keywords[] = $categoryData['title'];
                }

                // Share SEO metadata via Inertia
                Inertia::share('customMetadata', [
                    'title' => $categoryName,
                    'description' => $description,
                    'keywords' => implode(', ', $keywords),
                    'image' => $imageUrl,
                    'url' => $request->url(),
                    'type' => 'website'
                ]);

                return Inertia::render('category.$slug', [
                    'slug' => $slug,
                    'sessionId' => $sessionId,
                    'categoryData' => $categoryData,
                    'error' => null
                ]);
            } else {
                return Inertia::render('category.$slug', [
                    'slug' => $slug,
                    'sessionId' => $sessionId,
                    'categoryData' => null,
                    'error' => $data['message'] ?? 'Category not found'
                ]);
            }
        } catch (\Exception $e) {
            return Inertia::render('category.$slug', [
                'slug' => $slug,
                'sessionId' => $sessionId,
                'categoryData' => null,
                'error' => 'An error occurred while fetching category data.'
            ]);
        }
    }

    public function contestant(Request $request, $votingSessionId, $categoryId, $contestantSlug)
    {
        try {
            $apiUrl = 'https://api-watch.wecodefy.com/api/v1/voting/get/voting/contensant';

            $response = Http::post($apiUrl, [
                'voting_session_id' => $votingSessionId,
                'contensant_slug' => $contestantSlug,
                'category_id' => $categoryId
            ]);

            if (!$response->successful()) {
                return Inertia::render('contenstant.$slug', [
                    'slug' => "{$votingSessionId}/{$categoryId}/{$contestantSlug}",
                    'contestantData' => null,
                    'error' => 'Failed to fetch contestant data. Please try again later.'
                ]);
            }

            $data = $response->json();

            if (isset($data['status']) && $data['status'] === 'ok' && isset($data['return'])) {
                $contestantData = $data['return'];
                $participant = $contestantData['participant'] ?? null;

                // Set SEO metadata based on contestant data
                if ($participant) {
                    // Format image URL for SEO (use CDN URL if not already a full URL)
                    $imageUrl = $participant['image'] ?? null;
                    if ($imageUrl && !str_starts_with($imageUrl, 'http')) {
                        $imageUrl = "https://cagura-assets.b-cdn.net/assets/uploaded/{$imageUrl}";
                    }
                }

                Inertia::share('customMetadata', [
                    'title' => $participant['name'] ?? null,
                    'description' => "Vote for {$participant['name']} in {$contestantData['title']}, {$contestantData['description']}",
                    'keywords' => "vote, {$participant['name']}, {$participant['category_name']}, contestant, {$contestantData['title']}, {$contestantData['description']}",
                    'image' => $imageUrl,
                    'url' => $request->url(),
                    'type' => 'profile'
                ]);

                return Inertia::render('contenstant.$slug', [
                    'slug' => "{$votingSessionId}/{$categoryId}/{$contestantSlug}",
                    'contestantData' => $contestantData,
                    'error' => null
                ]);
            } else {
                return Inertia::render('contenstant.$slug', [
                    'slug' => "{$votingSessionId}/{$categoryId}/{$contestantSlug}",
                    'contestantData' => null,
                    'error' => $data['message'] ?? 'Contestant not found'
                ]);
            }
        } catch (\Exception $e) {
            return Inertia::render('contenstant.$slug', [
                'slug' => "{$votingSessionId}/{$categoryId}/{$contestantSlug}",
                'contestantData' => null,
                'error' => 'An error occurred while fetching contestant data.'
            ]);
        }
    }

    public function events()
    {
        return Inertia::render('events');
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
        return Inertia::render('event.$slug', [
            'slug' => $slug
        ]);
    }

    public function contact()
    {
        return Inertia::render('contact');
    }

    public function submitContact(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'subject' => ['nullable', 'string', 'max:255'],
            'message' => ['required', 'string'],
        ]);

        Contacts::create($validated);

        return back()->with('success', 'Thank you for contacting us. We\'ll get back to you shortly.');
    }

    public function submitSubscribe(Request $request)
    {
        $validated = $request->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:subscriptions,email'],
            'phone' => ['nullable', 'string', 'max:50'],
        ]);

        Subscriptions::create($validated);

        return back()->with('success', 'Thank you for subscribing!');
    }

    public function submitMinistryJoin(Request $request)
    {
        $validated = $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:50'],
            'email' => ['required', 'email', 'max:255'],
        ]);

        MinistrySubmission::create($validated);

        return back()->with('success', 'Thank you for joining our ministry! We\'ll contact you soon.');
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
