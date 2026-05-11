<?php

namespace App\Filament\Resources\Blogs\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class BlogsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image')
                    ->circular()
                    ->size(50),
                
                TextColumn::make('title')
                    ->searchable()
                    ->sortable()
                    ->limit(50),

                TextColumn::make('author')
                    ->label('Author')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),
                
                TextColumn::make('content')
                    ->limit(100)
                    ->html()
                    ->toggleable(),
                
                TextColumn::make('tags')
                    ->badge()
                    ->separator(',')
                    ->limit(3)
                    ->toggleable(),
                
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('has_image')
                    ->label('Has Image')
                    ->options([
                        1 => 'Yes',
                        0 => 'No',
                    ])
                    ->query(function ($query, array $data) {
                        if ($data['value'] === '1') {
                            return $query->whereNotNull('image');
                        } elseif ($data['value'] === '0') {
                            return $query->whereNull('image');
                        }
                        return $query;
                    }),
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }
}
