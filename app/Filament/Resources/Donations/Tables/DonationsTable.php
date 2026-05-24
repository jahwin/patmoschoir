<?php

namespace App\Filament\Resources\Donations\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class DonationsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Name')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('email')
                    ->label('Email')
                    ->searchable()
                    ->copyable()
                    ->placeholder('—'),

                TextColumn::make('phone')
                    ->label('Phone')
                    ->searchable()
                    ->placeholder('—'),

                TextColumn::make('amount')
                    ->label('Amount')
                    ->formatStateUsing(fn ($state, $record) => match ($record->currency) {
                        'RWF'   => 'RWF '.number_format((float) $state, 0),
                        default => '$'.number_format((float) $state, 2),
                    })
                    ->sortable(),

                TextColumn::make('currency')
                    ->label('Currency')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'RWF'   => 'success',
                        default => 'info',
                    })
                    ->sortable(),

                TextColumn::make('created_at')
                    ->label('Submitted')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('currency')
                    ->label('Currency')
                    ->options([
                        'USD' => 'USD',
                        'RWF' => 'RWF',
                    ]),
            ])
            ->recordActions([
                ViewAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }
}
