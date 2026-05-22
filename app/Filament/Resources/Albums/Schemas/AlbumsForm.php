<?php

namespace App\Filament\Resources\Albums\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class AlbumsForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Album Name')
                    ->required()
                    ->maxLength(255)
                    ->columnSpanFull(),

                TextInput::make('year')
                    ->label('Release Year')
                    ->placeholder('e.g., 2024')
                    ->maxLength(4),

                FileUpload::make('image')
                    ->label('Cover Art')
                    ->image()
                    ->imageEditor()
                    ->imageEditorAspectRatios(['1:1'])
                    ->maxSize(2048)
                    ->directory('albums/covers')
                    ->visibility('public'),

                Textarea::make('description')
                    ->label('Description')
                    ->placeholder('Enter album description')
                    ->rows(3)
                    ->columnSpanFull(),

                Repeater::make('tracks')
                    ->label('Tracks')
                    ->schema([
                        TextInput::make('number')
                            ->label('#')
                            ->numeric()
                            ->minValue(1)
                            ->columnSpan(1),
                        TextInput::make('title')
                            ->label('Track Title')
                            ->required()
                            ->maxLength(255)
                            ->columnSpan(2),
                        TextInput::make('duration')
                            ->label('Duration')
                            ->placeholder('e.g., 3:45')
                            ->maxLength(10)
                            ->columnSpan(1),
                    ])
                    ->columns(4)
                    ->reorderable()
                    ->reorderableWithDragAndDrop()
                    ->addActionLabel('Add Track')
                    ->defaultItems(0)
                    ->collapsible()
                    ->columnSpanFull(),

                Repeater::make('links')
                    ->label('Streaming Links')
                    ->schema([
                        Select::make('platform')
                            ->label('Platform')
                            ->options([
                                'SPOTIFY'     => 'SPOTIFY',
                                'APPLE_MUSIC' => 'APPLE_MUSIC',
                                'YOUTUBE'     => 'YOUTUBE',
                                'SOUNDCLOUD'  => 'SOUNDCLOUD',
                                'TIDAL'       => 'TIDAL',
                                'DEEZER'      => 'DEEZER',
                                'AMAZON_MUSIC' => 'AMAZON_MUSIC',
                                'AUDIOMACK'   => 'AUDIOMACK',
                                'BOOMPLAY'    => 'BOOMPLAY',
                            ])
                            ->required()
                            ->searchable()
                            ->columnSpan(1),
                        TextInput::make('url')
                            ->label('URL')
                            ->placeholder('https://')
                            ->url()
                            ->required()
                            ->maxLength(500)
                            ->columnSpan(2),
                    ])
                    ->columns(3)
                    ->addActionLabel('Add Streaming Link')
                    ->defaultItems(0)
                    ->collapsible()
                    ->columnSpanFull(),
            ]);
    }
}
