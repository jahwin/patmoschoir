<?php

namespace App\Filament\Resources\Outreaches\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\TimePicker;
use Filament\Schemas\Schema;

class OutreachesForm
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

                Textarea::make('description')
                    ->label('Description')
                    ->required()
                    ->rows(3)
                    ->columnSpanFull(),

                TextInput::make('location')
                    ->label('Location')
                    ->required()
                    ->maxLength(255),

                DatePicker::make('date')
                    ->label('Date')
                    ->required(),

                TimePicker::make('start_time')
                    ->label('Start Time')
                    ->required(),

                TimePicker::make('end_time')
                    ->label('End Time'),

                Select::make('visibility')
                    ->label('Visibility')
                    ->options([
                        'PUBLIC'   => 'PUBLIC',
                        'UNLISTED' => 'UNLISTED',
                    ])
                    ->default('PUBLIC')
                    ->required(),

                FileUpload::make('image')
                    ->label('Image')
                    ->image()
                    ->imageEditor()
                    ->imageEditorAspectRatios([null, '16:9', '4:3', '1:1'])
                    ->maxSize(2048)
                    ->directory('outreaches')
                    ->visibility('public')
                    ->columnSpanFull(),
            ]);
    }
}
