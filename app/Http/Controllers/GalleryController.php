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
        $galleries = Gallery::latest()->get();

        // Process galleries data even if empty
        $galleries = $galleries->map(function ($gallery) {
            $gallery->image = Storage::url($gallery->image);
            
            if ($gallery->images && is_array($gallery->images)) {
                $gallery->images = array_map(function ($image) {
                    return Storage::url($image);
                }, $gallery->images);
            }
            
            return $gallery;
        });

        return Inertia::render('gallery', compact('galleries'));
    }
}
