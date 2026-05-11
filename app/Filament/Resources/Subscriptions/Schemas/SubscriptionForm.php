<?php

namespace App\Filament\Resources\Subscriptions\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class SubscriptionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('first_name')
                    ->required()
                    ->maxLength(255)
                    ->disabled(),

                TextInput::make('last_name')
                    ->required()
                    ->maxLength(255)
                    ->disabled(),

                TextInput::make('email')
                    ->email()
                    ->required()
                    ->maxLength(255)
                    ->disabled(),

                TextInput::make('phone')
                    ->maxLength(50)
                    ->disabled(),
            ]);
    }
}
