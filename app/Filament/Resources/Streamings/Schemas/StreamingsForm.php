<?php

namespace App\Filament\Resources\Streamings\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\TimePicker;
use Filament\Schemas\Schema;

class StreamingsForm
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

                DatePicker::make('date')
                    ->label('Date')
                    ->required(),

                TextInput::make('location')
                    ->label('Location')
                    ->required()
                    ->maxLength(255),

                TimePicker::make('start_time')
                    ->label('Start Time')
                    ->required(),

                TimePicker::make('end_time')
                    ->label('End Time')
                    ->required(),

                TextInput::make('link')
                    ->label('Event Link')
                    ->placeholder('https://')
                    ->url()
                    ->required()
                    ->maxLength(500),

                TextInput::make('stream_url')
                    ->label('Stream URL')
                    ->placeholder('https://')
                    ->url()
                    ->required()
                    ->maxLength(500),

                TextInput::make('stream_id')
                    ->label('Stream ID')
                    ->placeholder('Auto-generated if left blank')
                    ->maxLength(255)
                    ->helperText('Leave blank to auto-generate a unique ID.'),

                Select::make('visibility')
                    ->label('Visibility')
                    ->options([
                        'PUBLIC'   => 'PUBLIC',
                        'UNLISTED' => 'UNLISTED',
                    ])
                    ->default('PUBLIC')
                    ->required(),

                FileUpload::make('cover')
                    ->label('Cover Image')
                    ->image()
                    ->imageEditor()
                    ->imageEditorAspectRatios([null, '16:9', '4:3', '1:1'])
                    ->maxSize(2048)
                    ->directory('streamings/covers')
                    ->visibility('public')
                    ->columnSpanFull(),
            ]);
    }
}
