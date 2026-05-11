<?php

namespace App\Filament\Resources\Subscriptions\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class SubscriptionInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('first_name')
                    ->label('First Name')
                    ->weight('bold'),

                TextEntry::make('last_name')
                    ->label('Last Name')
                    ->weight('bold'),

                TextEntry::make('email')
                    ->label('Email')
                    ->copyable(),

                TextEntry::make('phone')
                    ->label('Phone')
                    ->placeholder('-')
                    ->copyable(),

                TextEntry::make('created_at')
                    ->label('Subscribed At')
                    ->dateTime(),
            ]);
    }
}
