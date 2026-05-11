<?php

namespace App\Http\Controllers;

use App\Models\Blogs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BlogsController extends Controller
{
    public function index()
    {
        $blogs = Blogs::latest()->get();
        
        if ($blogs->isEmpty()) {
            return Inertia::render('404');
        }

        $blogsWithReadTime = $blogs->map(function ($blog) {
            $blog->image = Storage::url($blog->image);
            $blog->read_time = $blog->getReadTime();
            $blog->word_count = $blog->getWordCount();
            return $blog;
        });

        return Inertia::render('news', [
            'blogs' => $blogsWithReadTime
        ]);
    }

    public function show($slug)
    {
        $blog = Blogs::where('slug', $slug)->first();
        
        if (!$blog) {
            return Inertia::render('404');
        }

        $blog->image = Storage::url($blog->image);

        $blog->read_time = $blog->getReadTime();
        $blog->word_count = $blog->getWordCount();

        if ($blog->tags) {
            $blog->tags = explode(',', $blog->tags);
        }

        $otherBlogs = Blogs::where('id', '!=', $blog->id)->latest()->take(3)->get();
        
        if ($otherBlogs && $otherBlogs->count() > 0) {
            $otherBlogs = $otherBlogs->map(function ($blog) {
                $blog->image = Storage::url($blog->image);
                $blog->read_time = $blog->getReadTime();
                $blog->word_count = $blog->getWordCount();
                return $blog;
            });
        }


        Inertia::share('customMetadata', [
            'title' => $blog->title,
            'description' => strip_tags($blog->content),
            'keywords' => $blog->tags ? implode(', ', $blog->tags) : '',
            'image' => Storage::url($blog->image),
            'url' => url()->current(),
            'type' => 'article'
        ]);
        
        return Inertia::render('blog.$slug', compact('blog', 'otherBlogs'));
    }
}
