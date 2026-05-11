<?php

namespace App\Filament\Resources\MusicChannels\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class MusicChannelsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('logo')
                    ->label('Logo')
                    ->circular()
                    ->size(50),
                TextColumn::make('service_name')
                    ->label('Service Name')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('button_text')
                    ->label('Button Text')
                    ->searchable(),
                TextColumn::make('link')
                    ->label('Link')
                    ->limit(50)
                    ->copyable(),
                TextColumn::make('rank')
                    ->label('Order')
                    ->sortable()
                    ->numeric(),
            ])
            ->filters([
                //
            ])
            ->defaultSort('rank', 'asc')
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
