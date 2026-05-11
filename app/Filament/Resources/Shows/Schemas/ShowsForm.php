<?php

namespace App\Filament\Resources\Shows\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class ShowsForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                DatePicker::make('show_date')
                    ->label('Show Date')
                    ->nullable(),

                TextInput::make('venue')
                    ->label('Venue')
                    ->required()
                    ->maxLength(255),

                TextInput::make('city')
                    ->label('City')
                    ->required()
                    ->maxLength(120),

                TextInput::make('state')
                    ->label('State')
                    ->required()
                    ->maxLength(120),

                TextInput::make('title')
                    ->label('Show Title')
                    ->helperText('Shown under the venue name on the homepage.')
                    ->required()
                    ->maxLength(255)
                    ->columnSpanFull(),

                TextInput::make('ticket_url')
                    ->label('Ticket Link')
                    ->helperText('Optional. If empty, the homepage will show "Soon".')
                    ->url()
                    ->maxLength(255)
                    ->columnSpanFull(),

                TextInput::make('ticket_button_text')
                    ->label('Ticket Button Text')
                    ->helperText('Label for the ticket button when a ticket link exists.')
                    ->maxLength(255),

                TextInput::make('no_tickets_button_text')
                    ->label('No Tickets Button Text')
                    ->helperText('Label for the button when no ticket link is available.')
                    ->maxLength(255),
            ]);
    }
}
