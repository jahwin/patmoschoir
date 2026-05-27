<?php

namespace App\Filament\Resources\Donations\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Filament\Tables\Columns\BadgeColumn;

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

                TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'success' => 'success',
                        'failed'  => 'danger',
                        default   => 'warning',
                    })
                    ->sortable(),

                TextColumn::make('paid_at')
                    ->label('Paid At')
                    ->dateTime()
                    ->sortable()
                    ->placeholder('—'),

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

                SelectFilter::make('status')
                    ->label('Status')
                    ->options([
                        'pending' => 'Pending',
                        'success' => 'Success',
                        'failed'  => 'Failed',
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
