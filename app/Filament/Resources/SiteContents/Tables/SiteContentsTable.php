<?php

namespace App\Filament\Resources\SiteContents\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
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

                TextColumn::make('site_color')
                    ->label('Site Color')
                    ->formatStateUsing(function ($state): string {
                        if (empty($state)) {
                            return 'No color set';
                        }
                        return $state;
                    })
                    ->badge()
                    ->color(fn ($state) => $state ?: 'gray')
                    ->placeholder('No color set'),

                ImageColumn::make('site_logo')
                    ->label('Logo')
                    ->size(60)
                    ->circular()
                    ->defaultImageUrl('/images/placeholder-logo.png'),

                TextColumn::make('address')
                    ->label('Address')
                    ->searchable()
                    ->sortable()
                    ->limit(30)
                    ->placeholder('No address'),

                TextColumn::make('whatsapp_number')
                    ->label('WhatsApp')
                    ->searchable()
                    ->sortable()
                    ->placeholder('No WhatsApp'),

                TextColumn::make('phones')
                    ->label('Phone Numbers')
                    ->formatStateUsing(function ($state): string {
                        if (empty($state)) {
                            return 'No phones';
                        }
                        
                        if (is_array($state)) {
                            return implode(', ', $state);
                        }
                        
                        return 'No phones';
                    })
                    ->badge()
                    ->placeholder('No phones'),

                TextColumn::make('emails')
                    ->label('Email Addresses')
                    ->formatStateUsing(function ($state): string {
                        if (empty($state)) {
                            return 'No emails';
                        }
                        
                        if (is_array($state)) {
                            return implode(', ', $state);
                        }
                        
                        return 'No emails';
                    })
                    ->badge()
                    ->placeholder('No emails'),

                TextColumn::make('social_links')
                    ->label('Social Links')
                    ->formatStateUsing(function ($state): string {
                        if (empty($state)) {
                            return 'No social links';
                        }
                        
                        $platforms = array_column($state, 'platform');
                        return count($platforms) . ' social link(s)';
                    })
                    ->placeholder('No social links'),

                TextColumn::make('about_us')
                    ->label('About Us')
                    ->limit(50)
                    ->tooltip(function (TextColumn $column): ?string {
                        $state = $column->getState();
                        if (strlen($state) <= 50) {
                            return null;
                        }
                        return $state;
                    })
                    ->placeholder('No description'),

                TextColumn::make('about_text')
                    ->label('About Text')
                    ->limit(50)
                    ->tooltip(function (TextColumn $column): ?string {
                        $state = $column->getState();
                        if (strlen($state) <= 50) {
                            return null;
                        }
                        return $state;
                    })
                    ->placeholder('No about text'),

                TextColumn::make('faqs')
                    ->label('FAQs')
                    ->formatStateUsing(function ($state): string {
                        if (empty($state)) {
                            return 'No FAQs';
                        }
                        
                        return count($state) . ' FAQ(s)';
                    })
                    ->placeholder('No FAQs'),

                TextColumn::make('keywords')
                    ->label('SEO Keywords')
                    ->formatStateUsing(function ($state): string {
                        if (empty($state)) {
                            return 'No keywords';
                        }
                        
                        if (is_array($state)) {
                            return count($state) . ' keyword(s)';
                        }
                        
                        return 'No keywords';
                    })
                    ->placeholder('No keywords'),

                TextColumn::make('description')
                    ->label('Site Description')
                    ->limit(30)
                    ->tooltip(function (TextColumn $column): ?string {
                        $state = $column->getState();
                        if (strlen($state) <= 30) {
                            return null;
                        }
                        return $state;
                    })
                    ->placeholder('No description'),

                ImageColumn::make('about_image')
                    ->label('About Image')
                    ->size(60)
                    ->circular()
                    ->defaultImageUrl('/images/placeholder-image.png'),

                TextColumn::make('footer_text')
                    ->label('Footer Text')
                    ->limit(30)
                    ->tooltip(function (TextColumn $column): ?string {
                        $state = $column->getState();
                        if (strlen($state) <= 30) {
                            return null;
                        }
                        return $state;
                    })
                    ->placeholder('No footer text'),

                TextColumn::make('created_at')
                    ->label('Created At')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('updated_at')
                    ->label('Updated At')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                // No specific filters needed for site content
            ])
            ->actions([
                ViewAction::make(),
                EditAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('updated_at', 'desc');
    }
}