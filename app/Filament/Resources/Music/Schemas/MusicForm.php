<?php

namespace App\Filament\Resources\Music\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class MusicForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                FileUpload::make('image')
                    ->label('Music Image')
                    ->image()
                    ->placeholder('Upload music image...')
                    ->imageEditor()
                    ->imageEditorMode(2)
                    ->imageEditorAspectRatios([
                        null,
                        '16:9',
                        '4:3',
                        '1:1',
                    ])
                    ->maxSize(2048)
                    ->directory('music/images')
                    ->visibility('public')
                    ->required()
                    ->columnSpanFull(),
                
                TextInput::make('link')
                    ->label('Link URL')
                    ->url()
                    ->placeholder('https://example.com')
                    ->maxLength(255)
                    ->required()
                    ->columnSpanFull(),
            ]);
    }
}
