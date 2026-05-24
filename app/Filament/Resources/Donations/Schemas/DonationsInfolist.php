<?php

namespace App\Filament\Resources\Donations\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class DonationsInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('name')
                    ->label('Name'),

                TextEntry::make('email')
                    ->label('Email')
                    ->copyable()
                    ->placeholder('—'),

                TextEntry::make('phone')
                    ->label('Phone')
                    ->copyable()
                    ->placeholder('—'),

                TextEntry::make('amount')
                    ->label('Amount')
                    ->formatStateUsing(fn ($state, $record) => match ($record->currency) {
                        'RWF'   => 'RWF '.number_format((float) $state, 0),
                        default => '$'.number_format((float) $state, 2),
                    }),

                TextEntry::make('currency')
                    ->label('Currency')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'RWF'   => 'success',
                        default => 'info',
                    }),

                TextEntry::make('created_at')
                    ->label('Submitted At')
                    ->dateTime(),
            ]);
    }
}
