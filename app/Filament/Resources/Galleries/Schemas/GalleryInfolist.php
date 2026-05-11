<?php

namespace App\Filament\Resources\Galleries\Schemas;

use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class GalleryInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('title')
                    ->label('Title')
                    ->size('lg')
                    ->weight('bold'),
                
                ImageEntry::make('image')
                    ->label('Featured Image')
                    ->size(400)
                    ->height(300),
                
                TextEntry::make('description')
                    ->label('Description')
                    ->columnSpanFull(),
                
                ImageEntry::make('images')
                    ->label('Gallery Images')
                    ->size(200)
                    ->height(150)
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
