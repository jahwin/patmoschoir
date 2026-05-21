<?php

namespace App\Filament\Resources\Events\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class EventsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image')
                    ->label('Image')
                    ->size(50)
                    ->circular(),

                TextColumn::make('title')
                    ->label('Title')
                    ->searchable()
                    ->sortable()
                    ->limit(40),

                TextColumn::make('slug')
                    ->label('Slug')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('date')
                    ->label('Date')
                    ->date('M d, Y')
                    ->sortable(),

                TextColumn::make('start_time')
                    ->label('Start')
                    ->time('H:i'),

                TextColumn::make('end_time')
                    ->label('End')
                    ->time('H:i'),

                TextColumn::make('location')
                    ->label('Location')
                    ->searchable()
                    ->limit(30),

                TextColumn::make('visibility')
                    ->label('Visibility')
                    ->badge()
                    ->color(fn ($state) => $state === 'Public' ? 'success' : 'warning'),

                TextColumn::make('booking_link')
                    ->label('Booking Link')
                    ->url(fn ($record) => $record->booking_link)
                    ->openUrlInNewTab()
                    ->limit(30)
                    ->toggleable(),

                TextColumn::make('ussd')
                    ->label('USSD')
                    ->toggleable(),

                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('visibility')
                    ->options([
                        'Public' => 'Public',
                        'Unlisted' => 'Unlisted',
                    ]),
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
            ->defaultSort('date', 'asc');
    }
}
