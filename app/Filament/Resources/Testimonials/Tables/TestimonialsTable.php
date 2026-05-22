<?php

namespace App\Filament\Resources\Testimonials\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class TestimonialsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Name')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('handle')
                    ->label('Handle')
                    ->searchable()
                    ->placeholder('—'),

                TextColumn::make('platform')
                    ->label('Platform')
                    ->badge()
                    ->color(fn ($state) => match ($state) {
                        'INSTAGRAM' => 'pink',
                        'YOUTUBE'   => 'danger',
                        'TIKTOK'    => 'gray',
                        'TWITTER'   => 'info',
                        'FACEBOOK'  => 'primary',
                        default     => 'gray',
                    }),

                TextColumn::make('message')
                    ->label('Message')
                    ->limit(60)
                    ->tooltip(fn ($record) => $record->message),

                TextColumn::make('date')
                    ->label('Date')
                    ->date('M d, Y')
                    ->sortable(),

                TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->color(fn ($state) => match ($state) {
                        'APPROVED' => 'success',
                        'REJECTED' => 'danger',
                        default    => 'warning',
                    }),

                TextColumn::make('visibility')
                    ->label('Visibility')
                    ->badge()
                    ->color(fn ($state) => $state === 'PUBLIC' ? 'success' : 'warning'),

                IconColumn::make('verified')
                    ->label('Verified')
                    ->boolean(),

                TextColumn::make('created_at')
                    ->label('Created')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('platform')
                    ->options([
                        'SITE'      => 'SITE',
                        'FACEBOOK'  => 'FACEBOOK',
                        'INSTAGRAM' => 'INSTAGRAM',
                        'TWITTER'   => 'TWITTER',
                        'YOUTUBE'   => 'YOUTUBE',
                        'TIKTOK'    => 'TIKTOK',
                    ]),
                SelectFilter::make('status')
                    ->options([
                        'PENDING'  => 'PENDING',
                        'APPROVED' => 'APPROVED',
                        'REJECTED' => 'REJECTED',
                    ]),
                SelectFilter::make('visibility')
                    ->options([
                        'PUBLIC'   => 'PUBLIC',
                        'UNLISTED' => 'UNLISTED',
                    ]),
            ])
            ->recordActions([
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
