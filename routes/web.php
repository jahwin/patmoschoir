<?php

use App\Http\Controllers\WebController;
use App\Http\Controllers\BlogsController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\ServicesController;
use App\Http\Controllers\DonationController;
use App\Http\Controllers\PaymentWebhookController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');


Route::get('/', [WebController::class, 'index'])->name('home');
Route::get('/about', [WebController::class, 'about'])->name('about');
Route::get('/services', [ServicesController::class, 'index'])->name('services');
Route::get('/gallery', [GalleryController::class, 'index'])->name('gallery');
Route::get('/news', [BlogsController::class, 'index'])->name('news');
Route::get('/news/{slug}', [BlogsController::class, 'show'])->name('news.show');
Route::get('/faq', [WebController::class, 'faq'])->name('faq');
Route::get('/voting', [WebController::class, 'votings'])->name('voting');
Route::get('/voting/{slug}', [WebController::class, 'voting'])->name('voting.session');
Route::get('/category/{slug}/{sessionId}', [WebController::class, 'category'])->name('category');
Route::get('/vote/{votingSessionId}/{categoryId}/{contestantSlug}', [WebController::class, 'contestant'])->name('contestant');
Route::get('/events', [WebController::class, 'events'])->name('events');
Route::get('/events/{slug}', [WebController::class, 'event'])->name('event');
Route::get('/videos', [WebController::class, 'videos'])->name('videos');
Route::get('/music', [WebController::class, 'music'])->name('music');
Route::get('/music-channels', [WebController::class, 'musicChannels'])->name('music-channels');
Route::get('/contact', [WebController::class, 'contact'])->name('contact');
Route::post('/contact', [WebController::class, 'submitContact'])->name('contact.submit');
Route::post('/ministry/join', [WebController::class, 'submitMinistryJoin'])->name('ministry.join');
Route::post('/subscribe', [WebController::class, 'submitSubscribe'])->name('subscribe');
Route::post('/donations/initiate', [DonationController::class, 'initiate'])
    ->middleware(['throttle:10,1'])
    ->name('donations.initiate');
Route::post('/api/payment/webhook', [PaymentWebhookController::class, 'handle'])
    ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class])
    ->name('payments.webhook');
ROute::get('/privacy-policy', [WebController::class, 'privacyPolicy'])->name('privacy-policy');
ROute::get('/terms-and-conditions', [WebController::class, 'termsAndConditions'])->name('terms-and-conditions');
ROute::get('/payment-terms', [WebController::class, 'paymentTerms'])->name('payment-terms');

// 404 Page
Route::get('/404', [WebController::class, 'notFound'])->name('404');

Route::fallback(function () {
    return Inertia::render('404')->toResponse(request())->setStatusCode(404);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
