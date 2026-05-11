<?php

namespace App\Filament\Resources\Galleries\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class GalleriesTable
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
                
                TextColumn::make('description')
                    ->limit(100)
                    ->toggleable(),
                
                TextColumn::make('images')
                    ->label('Gallery Images Count')
                    ->formatStateUsing(function ($state) {
                        if (is_string($state)) {
                            $images = json_decode($state, true);
                            return is_array($images) ? count($images) : 0;
                        }
                        return 0;
                    })
                    ->badge()
                    ->color('primary')
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
                SelectFilter::make('has_featured_image')
                    ->label('Has Featured Image')
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
                
                SelectFilter::make('has_gallery_images')
                    ->label('Has Gallery Images')
                    ->options([
                        1 => 'Yes',
                        0 => 'No',
                    ])
                    ->query(function ($query, array $data) {
                        if ($data['value'] === '1') {
                            return $query->whereNotNull('images');
                        } elseif ($data['value'] === '0') {
                            return $query->whereNull('images');
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
