<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GalleryController extends Controller
{
    public function index()
    {
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

        return Inertia::render('gallery', compact('galleries'));
    }
}
