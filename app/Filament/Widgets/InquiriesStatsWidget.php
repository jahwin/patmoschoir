<?php

namespace App\Filament\Widgets;

use App\Filament\Resources\Contacts\ContactsResource;
use App\Filament\Resources\Donations\DonationsResource;
use App\Filament\Resources\JoinUs\JoinUsResource;
use App\Models\Contact;
use App\Models\Donation;
use App\Models\JoinUs;
use Carbon\Carbon;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class InquiriesStatsWidget extends BaseWidget
{
    protected static ?int $sort = 3;

    protected function getStats(): array
    {
        $timezone  = 'Africa/Kigali';
        $todayStart = Carbon::now($timezone)->startOfDay()->utc();
        $todayEnd   = Carbon::now($timezone)->endOfDay()->utc();

        $totalContacts  = $this->tryCount(fn () => Contact::count());
        $todayContacts  = $this->tryCount(fn () => Contact::whereBetween('created_at', [$todayStart, $todayEnd])->count());

        $totalJoinUs    = $this->tryCount(fn () => JoinUs::count());
        $todayJoinUs    = $this->tryCount(fn () => JoinUs::whereBetween('created_at', [$todayStart, $todayEnd])->count());

        $totalDonations = $this->tryCount(fn () => Donation::count());
        $todayDonations = $this->tryCount(fn () => Donation::whereBetween('created_at', [$todayStart, $todayEnd])->count());

        return [
            Stat::make('Contact Messages', $totalContacts)
                ->description("{$todayContacts} received today")
                ->descriptionIcon('lucide-mail')
                ->color('info')
                ->url(ContactsResource::getUrl('index')),

            Stat::make('Join Us Requests', $totalJoinUs)
                ->description("{$todayJoinUs} received today")
                ->descriptionIcon('lucide-user-plus')
                ->color('success')
                ->url(JoinUsResource::getUrl('index')),

            Stat::make('Donations', $totalDonations)
                ->description("{$todayDonations} received today")
                ->descriptionIcon('lucide-hand-coins')
                ->color('warning')
                ->url(DonationsResource::getUrl('index')),
        ];
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
