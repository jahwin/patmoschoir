<?php

namespace App\Filament\Resources\Slides\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Schema;

class SlidesForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('media_type')
                    ->label('Media Type')
                    ->options([
                        'image' => 'Image',
                        'video' => 'Video (m3u8)',
                    ])
                    ->default('image')
                    ->required()
                    ->columnSpanFull(),

                FileUpload::make('image')
                    ->label('Slide Image')
                    ->image()
                    ->placeholder('Upload slide image')
                    ->imageEditor()
                    ->imageEditorMode(2)
                    ->imageEditorAspectRatios([
                        null,
                        '16:9',
                        '4:3',
                        '1:1',
                    ])
                    ->placeholder('Upload slide image...')
                    ->maxSize(2048)
                    ->directory('slides')
                    ->visibility('public')
                    ->required(fn (Get $get) => $get('media_type') === 'image')
                    ->visible(fn (Get $get) => $get('media_type') === 'image')
                    ->dehydrateStateUsing(fn ($state, Get $get) => $get('media_type') === 'image' ? $state : '')
                    ->columnSpanFull(),

                TextInput::make('video_url')
                    ->label('Video URL (m3u8)')
                    ->placeholder('https://example.com/stream.m3u8')
                    ->helperText('Use a direct .m3u8 stream URL.')
                    ->url()
                    ->required(fn (Get $get) => $get('media_type') === 'video')
                    ->visible(fn (Get $get) => $get('media_type') === 'video')
                    ->dehydrateStateUsing(fn ($state, Get $get) => $get('media_type') === 'video' ? $state : null)
                    ->columnSpanFull(),
            ]);
    }
}
