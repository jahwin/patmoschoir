<?php

namespace App\Filament\Resources\MusicChannels\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class MusicChannelForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                FileUpload::make('logo')
                    ->label('Service Logo')
                    ->image()
                    ->placeholder('Upload service logo...')
                    ->imageEditor()
                    ->imageEditorMode(2)
                    ->imageEditorAspectRatios([
                        null,
                        '16:9',
                        '4:3',
                        '1:1',
                    ])
                    ->maxSize(2048)
                    ->directory('music-channels/logos')
                    ->visibility('public')
                    ->required()
                    ->columnSpanFull(),
                
                TextInput::make('service_name')
                    ->label('Service Name')
                    ->placeholder('e.g., Spotify, Apple Music')
                    ->maxLength(255)
                    ->required()
                    ->columnSpanFull(),
                
                TextInput::make('link')
                    ->label('Link URL')
                    ->url()
                    ->placeholder('https://example.com')
                    ->maxLength(500)
                    ->required()
                    ->columnSpanFull(),
                
                TextInput::make('button_text')
                    ->label('Button Text')
                    ->placeholder('e.g., Play, Download, 2LP Vinyl')
                    ->default('Play')
                    ->maxLength(255)
                    ->required()
                    ->columnSpanFull(),
                
                TextInput::make('rank')
                    ->label('Display Order')
                    ->numeric()
                    ->default(0)
                    ->placeholder('Lower numbers appear first')
                    ->required()
                    ->columnSpanFull(),
            ]);
    }
}
