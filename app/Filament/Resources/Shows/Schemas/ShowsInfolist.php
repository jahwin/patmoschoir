<?php

namespace App\Filament\Resources\Shows\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class ShowsInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('show_date')
                    ->label('Show Date')
                    ->date(),

                TextEntry::make('venue')
                    ->label('Venue'),

                TextEntry::make('city')
                    ->label('City'),

                TextEntry::make('state')
                    ->label('State'),

                TextEntry::make('title')
                    ->label('Show Title')
                    ->columnSpanFull(),

                TextEntry::make('ticket_url')
                    ->label('Ticket Link')
                    ->url(fn ($record) => $record->ticket_url)
                    ->openUrlInNewTab()
                    ->columnSpanFull(),

                TextEntry::make('ticket_button_text')
                    ->label('Ticket Button Text'),

                TextEntry::make('no_tickets_button_text')
                    ->label('No Tickets Button Text'),

                TextEntry::make('created_at')
                    ->label('Created At')
                    ->dateTime(),

                TextEntry::make('updated_at')
                    ->label('Updated At')
                    ->dateTime(),
            ]);
    }
}
