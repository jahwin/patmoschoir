<?php

namespace App\Filament\Resources\Music\Schemas;

use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class MusicInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                ImageEntry::make('image')
                    ->label('Music Image')
                    ->size(300)
                    ->height(300),
                
                TextEntry::make('link')
                    ->label('Link URL')
                    ->url(fn ($record) => $record->link)
                    ->openUrlInNewTab()
                    ->columnSpanFull(),
                
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
