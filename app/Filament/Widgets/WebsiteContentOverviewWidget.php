<?php

namespace App\Filament\Widgets;

use App\Filament\Resources\Albums\AlbumsResource;
use App\Filament\Resources\Donations\DonationsResource;
use App\Filament\Resources\Events\EventsResource;
use App\Filament\Resources\Galleries\GalleriesResource;
use App\Filament\Resources\Outreaches\OutreachesResource;
use App\Filament\Resources\SiteContents\SiteContentsResource;
use App\Filament\Resources\Streamings\StreamingsResource;
use App\Models\Donation;
use App\Models\Events;
use App\Models\Gallery;
use App\Models\Outreach;
use App\Models\Playlist;
use App\Models\SiteContent;
use App\Models\Streaming;
use Carbon\Carbon;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class WebsiteContentOverviewWidget extends BaseWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        $timezone   = 'Africa/Kigali';
        $now        = Carbon::now($timezone);
        $siteContent = $this->tryQuery(fn () => SiteContent::first());

        $totalEvents    = $this->tryCount(fn () => Events::count());
        $upcomingEvents = $this->tryCount(fn () => Events::where('date', '>=', $now->toDateString())->count());

        $totalAlbums = $this->tryCount(fn () => Playlist::count());

        $totalGalleries  = $this->tryCount(fn () => Gallery::count());
        $publicGalleries = $this->tryCount(fn () => Gallery::where('visibility', 'Public')->count());

        $totalStreams    = $this->tryCount(fn () => Streaming::count());
        $upcomingStreams = $this->tryCount(fn () => Streaming::where('date', '>=', $now->toDateString())->count());

        $totalOutreaches    = $this->tryCount(fn () => Outreach::count());
        $upcomingOutreaches = $this->tryCount(fn () => Outreach::where('date', '>=', $now->toDateString())->count());

        $totalDonations = $this->tryCount(fn () => Donation::count());

        return [
            Stat::make('Site', $siteContent?->site_name ?? 'Not Configured')
                ->description('Active site configuration')
                ->descriptionIcon('heroicon-m-globe-alt')
                ->color($siteContent?->site_name ? 'success' : 'warning')
                ->url(
                    $siteContent
                        ? SiteContentsResource::getUrl('edit', ['record' => $siteContent])
                        : SiteContentsResource::getUrl('index')
                ),

            Stat::make('Events', $totalEvents)
                ->description("{$upcomingEvents} upcoming")
                ->descriptionIcon('lucide-ticket')
                ->color('warning')
                ->url(EventsResource::getUrl('index')),

            Stat::make('Albums', $totalAlbums)
                ->description('Music releases')
                ->descriptionIcon('lucide-disc-3')
                ->color('info')
                ->url(AlbumsResource::getUrl('index')),

            Stat::make('Galleries', $totalGalleries)
                ->description("{$publicGalleries} public")
                ->descriptionIcon('lucide-image')
                ->color('success')
                ->url(GalleriesResource::getUrl('index')),

            Stat::make('Live Streams', $totalStreams)
                ->description("{$upcomingStreams} upcoming")
                ->descriptionIcon('lucide-radio')
                ->color('danger')
                ->url(StreamingsResource::getUrl('index')),

            Stat::make('Outreaches', $totalOutreaches)
                ->description("{$upcomingOutreaches} upcoming")
                ->descriptionIcon('lucide-heart-handshake')
                ->color('success')
                ->url(OutreachesResource::getUrl('index')),

            Stat::make('Donations', $totalDonations)
                ->description('Ministry support gifts')
                ->descriptionIcon('lucide-hand-coins')
                ->color('warning')
                ->url(DonationsResource::getUrl('index')),
        ];
    }

    private function tryQuery(\Closure $callback): mixed
    {
        try {
            return $callback();
        } catch (\Throwable) {
            return null;
        }
    }

    private function tryCount(\Closure $callback): int|string
    {
        try {
            return $callback();
        } catch (\Throwable) {
            return '—';
        }
    }
}
