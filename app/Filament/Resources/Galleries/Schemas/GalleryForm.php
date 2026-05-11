<?php

namespace App\Filament\Resources\Galleries\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class GalleryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->label('Gallery Title')
                    ->placeholder('Enter gallery title...')
                    ->maxLength(255)
                    ->columnSpanFull(),
                
                FileUpload::make('image')
                    ->label('Featured Image')
                    ->image()
                    ->placeholder('Upload featured image')
                    ->imageEditor()
                    ->imageEditorMode(2)
                    ->imageEditorAspectRatios([
                        null,
                        '16:9',
                        '4:3',
                        '1:1',
                    ])
                    ->required()
                    ->placeholder('Upload featured image...')
                    ->maxSize(2048)
                    ->directory('galleries/featured')
                    ->visibility('public')
                    ->columnSpanFull(),
                
                FileUpload::make('images')
                    ->label('Gallery Images')
                    ->image()
                    ->multiple()
                    ->placeholder('Upload multiple gallery images')
                    ->imageEditor()
                    ->imageEditorMode(2)
                    ->imageEditorAspectRatios([
                        null,
                        '16:9',
                        '4:3',
                        '1:1',
                    ])
                    ->placeholder('Upload gallery images...')
                    ->maxSize(2048)
                    ->directory('galleries/images')
                    ->visibility('public')
                    ->columnSpanFull(),
                
                Textarea::make('description')
                    ->label('Description')
                    ->placeholder('Enter gallery description...')
                    ->rows(4)
                    ->columnSpanFull(),
            ]);
    }
}
