<?php

namespace App\Filament\Resources\Donations\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class DonationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('full_name')
                    ->disabled(),
                TextInput::make('email')
                    ->disabled(),
                TextInput::make('phone')
                    ->disabled(),
                TextInput::make('amount')
                    ->disabled(),
                TextInput::make('currency')
                    ->disabled(),
                TextInput::make('status')
                    ->disabled(),
                TextInput::make('reference')
                    ->disabled(),
                TextInput::make('provider_transaction_id')
                    ->disabled(),
            ]);
    }
}
