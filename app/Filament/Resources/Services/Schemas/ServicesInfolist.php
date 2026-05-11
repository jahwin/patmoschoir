<?php

namespace App\Filament\Resources\Services\Schemas;

use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class ServicesInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('title')
                    ->label('Service Title')
                    ->size('lg')
                    ->weight('bold'),
                
                ImageEntry::make('image')
                    ->label('Service Image')
                    ->size(300)
                    ->height(200),
                
                TextEntry::make('description')
                    ->label('Description')
                    ->columnSpanFull(),
                
                TextEntry::make('inclusions')
                    ->label('Inclusions')
                    ->badge()
                    ->separator(',')
                    ->columnSpanFull(),
                
                TextEntry::make('text')
                    ->label('Additional Text')
                    ->html()
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