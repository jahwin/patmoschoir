<?php

namespace App\Filament\Resources\Services\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class ServicesForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->label('Service Title')
                    ->maxLength(255)
                    ->placeholder('Enter service title...')
                    ->columnSpanFull(),
                
                FileUpload::make('image')
                    ->label('Service Image')
                    ->image()
                    ->placeholder('Upload service image...')
                    ->imageEditor()
                    ->imageEditorMode(2)
                    ->imageEditorAspectRatios([
                        null,
                        '16:9',
                        '4:3',
                        '1:1',
                    ])
                    ->maxSize(2048)
                    ->directory('services/images')
                    ->visibility('public')
                    ->columnSpanFull(),
                
                Textarea::make('description')
                    ->label('Service Description')
                    ->rows(3)
                    ->placeholder('Enter service description...')
                    ->columnSpanFull(),
                
                TagsInput::make('inclusions')
                    ->label('Service Inclusions')
                    ->placeholder('Enter service inclusions...')
                    ->separator(',')
                    ->columnSpanFull(),
            ]);
    }
}
