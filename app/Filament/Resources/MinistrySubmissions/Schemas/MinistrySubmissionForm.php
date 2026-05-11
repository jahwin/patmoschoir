<?php

namespace App\Filament\Resources\MinistrySubmissions\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class MinistrySubmissionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('full_name')
                    ->required()
                    ->maxLength(255)
                    ->disabled(),

                TextInput::make('phone')
                    ->required()
                    ->maxLength(50)
                    ->disabled(),

                TextInput::make('email')
                    ->email()
                    ->required()
                    ->maxLength(255)
                    ->disabled(),
            ]);
    }
}
