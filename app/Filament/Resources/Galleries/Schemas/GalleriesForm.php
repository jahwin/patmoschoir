<?php

namespace App\Filament\Resources\Galleries\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class GalleriesForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->label('Title')
                    ->required()
                    ->maxLength(255)
                    ->columnSpanFull(),

                TextInput::make('year')
                    ->label('Year')
                    ->placeholder('e.g., 2024')
                    ->maxLength(4),

                Select::make('visibility')
                    ->label('Visibility')
                    ->options([
                        'Public'   => 'Public',
                        'Unlisted' => 'Unlisted',
                    ])
                    ->default('Public')
                    ->required(),

                Textarea::make('description')
                    ->label('Description')
                    ->placeholder('Enter gallery description')
                    ->rows(3)
                    ->columnSpanFull(),

                FileUpload::make('cover')
                    ->label('Cover Photo')
                    ->image()
                    ->imageEditor()
                    ->imageEditorAspectRatios([null, '16:9', '4:3', '1:1'])
                    ->maxSize(2048)
                    ->directory('galleries/covers')
                    ->visibility('public')
                    ->columnSpanFull(),

                FileUpload::make('images')
                    ->label('Gallery Images')
                    ->image()
                    ->multiple()
                    ->reorderable()
                    ->panelLayout('grid')
                    ->panelAspectRatio('4:3')
                    ->imagePreviewHeight('100')
                    ->imageEditor()
                    ->imageEditorAspectRatios([null, '16:9', '4:3', '1:1'])
                    ->maxSize(4096)
                    ->directory('galleries/images')
                    ->visibility('public')
                    ->columnSpanFull(),
            ]);
    }
}
