<?php

namespace App\Filament\Resources\Testimonials\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class TestimonialsForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Name')
                    ->required()
                    ->maxLength(255),

                TextInput::make('title')
                    ->label('Title / Role')
                    ->placeholder('e.g., Fan, Music Critic')
                    ->maxLength(255),

                TextInput::make('handle')
                    ->label('Handle / Username')
                    ->placeholder('e.g., @username')
                    ->maxLength(255),

                Select::make('platform')
                    ->label('Platform')
                    ->options([
                        'SITE'      => 'SITE',
                        'FACEBOOK'  => 'FACEBOOK',
                        'INSTAGRAM' => 'INSTAGRAM',
                        'TWITTER'   => 'TWITTER',
                        'YOUTUBE'   => 'YOUTUBE',
                        'TIKTOK'    => 'TIKTOK',
                    ])
                    ->required(),

                DatePicker::make('date')
                    ->label('Date')
                    ->required(),

                Select::make('status')
                    ->label('Status')
                    ->options([
                        'PENDING'  => 'PENDING',
                        'APPROVED' => 'APPROVED',
                        'REJECTED' => 'REJECTED',
                    ])
                    ->default('PENDING')
                    ->required(),

                Select::make('visibility')
                    ->label('Visibility')
                    ->options([
                        'PUBLIC'   => 'PUBLIC',
                        'UNLISTED' => 'UNLISTED',
                    ])
                    ->default('PUBLIC')
                    ->required(),

                Toggle::make('verified')
                    ->label('Verified')
                    ->default(false),

                Textarea::make('message')
                    ->label('Testimonial')
                    ->required()
                    ->rows(4)
                    ->columnSpanFull(),
            ]);
    }
}
