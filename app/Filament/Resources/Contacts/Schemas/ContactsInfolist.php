<?php

namespace App\Filament\Resources\Contacts\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class ContactsInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('name')
                    ->label('Name'),

                TextEntry::make('email')
                    ->label('Email')
                    ->copyable(),

                TextEntry::make('phone')
                    ->label('Phone')
                    ->placeholder('—')
                    ->copyable(),

                TextEntry::make('created_at')
                    ->label('Submitted At')
                    ->dateTime(),

                TextEntry::make('message')
                    ->label('Message')
                    ->columnSpanFull(),
            ]);
    }
}
