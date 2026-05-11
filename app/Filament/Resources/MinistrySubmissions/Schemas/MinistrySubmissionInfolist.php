<?php

namespace App\Filament\Resources\MinistrySubmissions\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class MinistrySubmissionInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('full_name')
                    ->label('Full Name')
                    ->weight('bold'),

                TextEntry::make('phone')
                    ->label('Phone')
                    ->copyable(),

                TextEntry::make('email')
                    ->label('Email')
                    ->copyable(),

                TextEntry::make('created_at')
                    ->label('Submitted At')
                    ->dateTime(),
            ]);
    }
}
