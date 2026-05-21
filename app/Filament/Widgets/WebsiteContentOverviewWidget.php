<?php

namespace App\Filament\Widgets;

use App\Filament\Resources\Events\EventsResource;
use App\Filament\Resources\SiteContents\SiteContentsResource;
use App\Models\Events;
use App\Models\SiteContent;
use Carbon\Carbon;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class WebsiteContentOverviewWidget extends BaseWidget
{
    protected function getStats(): array
    {
        $timezone = 'Africa/Kigali';
        $todayStart = Carbon::now($timezone)->startOfDay();
        $todayEnd = Carbon::now($timezone)->endOfDay();
        $donationCurrency = config('weflexfy.default_currency', 'USD');

        $siteContent = $this->tryQuery(fn () => SiteContent::first());

        $stats = [];

        $stats[] = Stat::make('Site Name', $siteContent?->site_name ?? 'Not Configured')
            ->description('Current site configuration')
            ->descriptionIcon('heroicon-m-globe-alt')
            ->color($siteContent?->site_name ? 'success' : 'warning')
            ->url($siteContent ? SiteContentsResource::getUrl('edit', ['record' => $siteContent]) : SiteContentsResource::getUrl('index'));

        $stats[] = Stat::make('Events', $this->tryCount(fn () => Events::count()))
            ->description('Total events / shows')
            ->descriptionIcon('lucide-ticket')
            ->color('warning')
            ->url(EventsResource::getUrl('index'));

        return $stats;
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
