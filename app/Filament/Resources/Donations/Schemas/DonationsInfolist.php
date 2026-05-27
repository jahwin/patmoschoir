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
                TextEntry::make('donation_number')
                    ->label('Donation #')
                    ->formatStateUsing(fn ($state) => $state ? '#'.$state : '—')
                    ->placeholder('—'),

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

                TextEntry::make('status')
                    ->label('Status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'success' => 'success',
                        'failed'  => 'danger',
                        default   => 'warning',
                    }),

                TextEntry::make('reference')
                    ->label('Reference')
                    ->copyable()
                    ->placeholder('—'),

                TextEntry::make('provider_transaction_id')
                    ->label('Transaction ID')
                    ->copyable()
                    ->placeholder('—'),

                TextEntry::make('paid_at')
                    ->label('Paid At')
                    ->dateTime()
                    ->placeholder('—'),

                TextEntry::make('created_at')
                    ->label('Submitted At')
                    ->dateTime(),
            ]);
    }
}
