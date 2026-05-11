<?php

namespace App\Filament\Resources\Donations\Schemas;

use Filament\Infolists\Components\Section;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class DonationInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Donation Details')
                ->columns(2)
                ->schema([
                    TextEntry::make('full_name'),
                    TextEntry::make('email'),
                    TextEntry::make('phone'),
                    TextEntry::make('amount'),
                    TextEntry::make('currency'),
                    TextEntry::make('status'),
                    TextEntry::make('reference'),
                    TextEntry::make('provider_transaction_id'),
                    TextEntry::make('paid_at')->dateTime(),
                    TextEntry::make('created_at')->dateTime(),
                ]),
        ]);
    }
}
