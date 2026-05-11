<?php

namespace App\Filament\Resources\Blogs\Schemas;

use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class BlogsInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('title')
                    ->label('Title')
                    ->size('lg')
                    ->weight('bold'),

                TextEntry::make('author')
                    ->label('Author')
                    ->columnSpanFull(),
                
                ImageEntry::make('image')
                    ->label('Featured Image')
                    ->size(300)
                    ->height(200),
                
                TextEntry::make('content')
                    ->label('Content')
                    ->html()
                    ->columnSpanFull(),
                
                TextEntry::make('tags')
                    ->label('Tags')
                    ->badge()
                    ->separator(',')
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
