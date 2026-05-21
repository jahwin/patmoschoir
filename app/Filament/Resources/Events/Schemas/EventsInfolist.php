<?php

namespace App\Filament\Resources\Events\Schemas;

use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class EventsInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('title')
                    ->label('Title')
                    ->columnSpanFull(),

                TextEntry::make('slug')
                    ->label('Slug')
                    ->columnSpanFull(),

                TextEntry::make('event_id')
                    ->label('Watch Event ID')
                    ->placeholder('—'),

                TextEntry::make('date')
                    ->label('Date')
                    ->date('M d, Y'),

                TextEntry::make('start_time')
                    ->label('Start Time'),

                TextEntry::make('end_time')
                    ->label('End Time'),

                TextEntry::make('location')
                    ->label('Location'),

                TextEntry::make('visibility')
                    ->label('Visibility')
                    ->badge()
                    ->color(fn ($state) => $state === 'Public' ? 'success' : 'warning'),

                TextEntry::make('booking_link')
                    ->label('Booking Link')
                    ->url(fn ($record) => $record->booking_link)
                    ->openUrlInNewTab()
                    ->placeholder('—'),

                TextEntry::make('ussd')
                    ->label('USSD Code')
                    ->placeholder('—'),

                TextEntry::make('description')
                    ->label('Description')
                    ->columnSpanFull()
                    ->placeholder('—'),

                ImageEntry::make('image')
                    ->label('Image')
                    ->columnSpanFull(),

                TextEntry::make('created_at')
                    ->label('Created At')
                    ->dateTime(),

                TextEntry::make('updated_at')
                    ->label('Updated At')
                    ->dateTime(),
            ]);
    }
}
