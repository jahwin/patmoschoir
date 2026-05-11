<?php

namespace App\Filament\Resources\Shows\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Table;

class ShowsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('show_date')
                    ->label('Date')
                    ->date('M d, Y')
                    ->sortable(),

                TextColumn::make('venue')
                    ->label('Venue')
                    ->searchable()
                    ->sortable()
                    ->limit(40),

                TextColumn::make('title')
                    ->label('Show Title')
                    ->searchable()
                    ->limit(40),

                TextColumn::make('city')
                    ->label('City')
                    ->searchable()
                    ->toggleable(),

                TextColumn::make('state')
                    ->label('State')
                    ->searchable()
                    ->toggleable(),

                TextColumn::make('ticket_url')
                    ->label('Ticket Link')
                    ->url(fn ($record) => $record->ticket_url)
                    ->openUrlInNewTab()
                    ->limit(40)
                    ->toggleable(),

                TextColumn::make('ticket_button_text')
                    ->label('Ticket Button Text')
                    ->limit(30)
                    ->toggleable(),

                TextColumn::make('no_tickets_button_text')
                    ->label('No Tickets Button Text')
                    ->limit(30)
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
                Filter::make('missing_ticket_link')
                    ->label('Missing Ticket Link')
                    ->query(fn ($query) => $query->whereNull('ticket_url')->orWhere('ticket_url', '')),
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
            ->defaultSort('show_date', 'asc');
    }
}
