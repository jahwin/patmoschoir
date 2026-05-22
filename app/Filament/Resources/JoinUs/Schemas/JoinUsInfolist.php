<?php

namespace App\Filament\Resources\JoinUs\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class JoinUsInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('first_name')
                    ->label('First Name'),

                TextEntry::make('last_name')
                    ->label('Last Name'),

                TextEntry::make('email')
                    ->label('Email')
                    ->copyable(),

                TextEntry::make('phone')
                    ->label('Phone')
                    ->placeholder('—')
                    ->copyable(),

                TextEntry::make('country')
                    ->label('Country')
                    ->placeholder('—'),

                TextEntry::make('city')
                    ->label('City')
                    ->placeholder('—'),

                TextEntry::make('created_at')
                    ->label('Submitted At')
                    ->dateTime(),

                TextEntry::make('message')
                    ->label('Message')
                    ->columnSpanFull(),
            ]);
    }
}
