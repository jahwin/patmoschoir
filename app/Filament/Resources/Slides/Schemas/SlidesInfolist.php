<?php

namespace App\Filament\Resources\Slides\Schemas;

use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class SlidesInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('media_type')
                    ->label('Media Type')
                    ->badge(),

                ImageEntry::make('image')
                    ->label('Slide Image')
                    ->size(400)
                    ->height(300)
                    ->visible(fn ($record) => $record?->media_type === 'image'),

                TextEntry::make('video_url')
                    ->label('Video URL')
                    ->url(fn ($record) => $record->video_url)
                    ->openUrlInNewTab()
                    ->visible(fn ($record) => $record?->media_type === 'video'),
                
                TextEntry::make('created_at')
                    ->label('Created At')
                    ->dateTime()
                    ->columnSpan(1),
                
                TextEntry::make('updated_at')
                    ->label('Updated At')
                    ->dateTime()
                    ->columnSpan(1),
            ]);
    }
}
