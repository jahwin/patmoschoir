<?php

namespace App\Filament\Resources\Video\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class VideoForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('youtube_link')
                    ->label('YouTube Link')
                    ->url()
                    ->placeholder('https://www.youtube.com/watch?v=... or https://youtu.be/...')
                    ->maxLength(500)
                    ->required()
                    ->helperText('Enter the full YouTube URL (e.g., https://www.youtube.com/watch?v=VIDEO_ID)')
                    ->columnSpanFull(),
            ]);
    }
}
