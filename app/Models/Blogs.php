<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Blogs extends Model
{
    protected $fillable = [
        'title',
        'author',
        'slug',
        'image',
        'content',
        'tags'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($blog) {
            if (empty($blog->slug)) {
                $slug = Str::limit(Str::slug($blog->title), 36, '');
                $random = Str::random(4);
                $blog->slug = $slug . '-' . $random;
            }
        });

        static::updating(function ($blog) {
            if ($blog->isDirty('title')) {
                $slug = Str::limit(Str::slug($blog->title), 36, '');
                $random = Str::random(4);
                $blog->slug = $slug . '-' . $random;
            }
        });
    }

    /**
     * Calculate the estimated reading time for the blog content
     * 
     * @param int $wordsPerMinute Average reading speed (default: 200 words per minute)
     * @return string Formatted reading time (e.g., "5 min", "1 min")
     */
    public function getReadTime($wordsPerMinute = 200)
    {
        $plainText = strip_tags($this->content);
        $wordCount = str_word_count($plainText);
        $minutes = ceil($wordCount / $wordsPerMinute);
        
        // Ensure minimum of 1 minute
        $minutes = max(1, $minutes);
        
        return $minutes . ' min';
    }

    /**
     * Get the word count of the blog content
     * 
     * @return int Number of words in the content
     */
    public function getWordCount()
    {
        $plainText = strip_tags($this->content);
        return str_word_count($plainText);
    }
}
