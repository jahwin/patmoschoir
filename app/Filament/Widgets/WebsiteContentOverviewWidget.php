<?php

namespace App\Filament\Widgets;

use App\Filament\Resources\Blogs\BlogsResource;
use App\Filament\Resources\Contacts\ContactsResource;
use App\Filament\Resources\Galleries\GalleryResource;
use App\Filament\Resources\MinistrySubmissions\MinistrySubmissionResource;
use App\Filament\Resources\Music\MusicResource;
use App\Filament\Resources\MusicChannels\MusicChannelResource;
use App\Filament\Resources\Services\ServicesResource;
use App\Filament\Resources\SiteContents\SiteContentsResource;
use App\Filament\Resources\Slides\SlidesResource;
use App\Filament\Resources\Video\VideoResource;
use App\Models\Blogs;
use App\Models\Contacts;
use App\Models\Donation;
use App\Models\Gallery;
use App\Models\MinistrySubmission;
use App\Models\Music;
use App\Models\MusicChannel;
use App\Models\Services;
use App\Models\SiteContent;
use App\Models\Slides;
use App\Models\Video;
use Carbon\Carbon;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class WebsiteContentOverviewWidget extends BaseWidget
{
    protected function getStats(): array
    {
        $siteContent = SiteContent::first();
        $timezone = 'Africa/Kigali';
        $todayStart = Carbon::now($timezone)->startOfDay();
        $todayEnd = Carbon::now($timezone)->endOfDay();
        $donationsTotal = Donation::query()
            ->where('status', 'success')
            ->whereBetween('paid_at', [$todayStart, $todayEnd])
            ->sum('amount');
        $donationCurrency = config('weflexfy.default_currency', 'USD');

        return [
            Stat::make('Site Name', $siteContent?->site_name ?? 'Not Configured')
                ->description('Current site configuration')
                ->descriptionIcon('heroicon-m-globe-alt')
                ->color($siteContent?->site_name ? 'success' : 'warning')
                ->url($siteContent ? SiteContentsResource::getUrl('edit', ['record' => $siteContent]) : null),

            Stat::make('Blogs', Blogs::count())
                ->description('Total blog posts')
                ->descriptionIcon('heroicon-m-document-text')
                ->color('primary')
                ->url(BlogsResource::getUrl('index')),

            Stat::make('Services', Services::count())
                ->description('Total services')
                ->descriptionIcon('heroicon-m-briefcase')
                ->color('success')
                ->url(ServicesResource::getUrl('index')),

            Stat::make('Galleries', Gallery::count())
                ->description('Total galleries')
                ->descriptionIcon('heroicon-m-photo')
                ->color('info')
                ->url(GalleryResource::getUrl('index')),

            Stat::make('Slides', Slides::count())
                ->description('Total slides')
                ->descriptionIcon('heroicon-m-presentation-chart-line')
                ->color('warning')
                ->url(SlidesResource::getUrl('index')),

            Stat::make('Music', Music::count())
                ->description('Total music tracks')
                ->descriptionIcon('heroicon-m-musical-note')
                ->color('danger')
                ->url(MusicResource::getUrl('index')),

            Stat::make('Videos', Video::count())
                ->description('Total videos')
                ->descriptionIcon('heroicon-m-video-camera')
                ->color('primary')
                ->url(VideoResource::getUrl('index')),

            Stat::make('Music Channels', MusicChannel::count())
                ->description('Total music channels')
                ->descriptionIcon('heroicon-m-speaker-wave')
                ->color('success')
                ->url(MusicChannelResource::getUrl('index')),

            Stat::make('Contact Messages', Contacts::count())
                ->description('Total contact submissions')
                ->descriptionIcon('heroicon-m-envelope')
                ->color('info')
                ->url(ContactsResource::getUrl('index')),

            Stat::make('Ministry Submissions', MinistrySubmission::count())
                ->description('Total ministry join requests')
                ->descriptionIcon('heroicon-m-user-group')
                ->color('warning')
                ->url(MinistrySubmissionResource::getUrl('index')),

            Stat::make('Donations Today', $donationsTotal ? number_format($donationsTotal, 2) . " {$donationCurrency}" : "0.00 {$donationCurrency}")
                ->description('Total successful donations today')
                ->descriptionIcon('heroicon-m-banknotes')
                ->color('success')
                ->url(\App\Filament\Resources\Donations\DonationResource::getUrl('index')),
        ];
    }
}
