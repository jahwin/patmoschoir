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
                    ->label('Name')
                    ->weight('bold'),

                TextEntry::make('email')
                    ->label('Email')
                    ->copyable(),

                TextEntry::make('phone')
                    ->label('Phone'),

                TextEntry::make('subject')
                    ->label('Subject'),

                TextEntry::make('message')
                    ->label('Message')
                    ->columnSpanFull(),

                TextEntry::make('created_at')
                    ->label('Received At')
                    ->dateTime(),
            ]);
    }
}
