<?php

namespace App\Filament\Widgets;

use App\Filament\Resources\Testimonials\TestimonialsResource;
use App\Models\Testimonials;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class TestimonialsStatsWidget extends BaseWidget
{
    protected static ?int $sort = 2;

    protected function getStats(): array
    {
        $total    = $this->tryCount(fn () => Testimonials::count());
        $pending  = $this->tryCount(fn () => Testimonials::where('status', 'PENDING')->count());
        $approved = $this->tryCount(fn () => Testimonials::where('status', 'APPROVED')->count());
        $rejected = $this->tryCount(fn () => Testimonials::where('status', 'REJECTED')->count());
        $public   = $this->tryCount(fn () => Testimonials::where('visibility', 'PUBLIC')->where('status', 'APPROVED')->count());

        return [
            Stat::make('Testimonials', $total)
                ->description('Total submitted')
                ->descriptionIcon('lucide-quote')
                ->color('primary')
                ->url(TestimonialsResource::getUrl('index')),

            Stat::make('Pending Review', $pending)
                ->description('Awaiting approval')
                ->descriptionIcon('heroicon-m-clock')
                ->color('warning')
                ->url(TestimonialsResource::getUrl('index')),

            Stat::make('Approved', $approved)
                ->description("{$rejected} rejected")
                ->descriptionIcon('heroicon-m-check-circle')
                ->color('success')
                ->url(TestimonialsResource::getUrl('index')),

            Stat::make('Public & Approved', $public)
                ->description('Visible on site')
                ->descriptionIcon('heroicon-m-eye')
                ->color('info')
                ->url(TestimonialsResource::getUrl('index')),
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
