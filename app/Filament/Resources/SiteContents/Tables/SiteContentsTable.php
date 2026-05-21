<?php

namespace App\Filament\Resources\SiteContents\Tables;

use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class SiteContentsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('site_name')
                    ->label('Site Name')
                    ->searchable()
                    ->sortable()
                    ->placeholder('No site name'),

                ImageColumn::make('site_logo')
                    ->label('Logo')
                    ->size(60)
                    ->circular(),

                TextColumn::make('address')
                    ->label('Address')
                    ->searchable()
                    ->limit(30)
                    ->placeholder('No address'),

                TextColumn::make('whatsapp_number')
                    ->label('WhatsApp')
                    ->searchable()
                    ->placeholder('No WhatsApp'),

                TextColumn::make('description')
                    ->label('Site Description')
                    ->limit(40)
                    ->placeholder('No description'),

                TextColumn::make('updated_at')
                    ->label('Last Updated')
                    ->dateTime()
                    ->sortable(),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->defaultSort('updated_at', 'desc');
    }
}
