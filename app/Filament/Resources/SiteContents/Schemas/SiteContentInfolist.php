<?php

namespace App\Filament\Resources\SiteContents\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class SiteContentInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('site_name')
                    ->label('Site Name')
                    ->placeholder('-'),
                TextEntry::make('site_color')
                    ->label('Site Color')
                    ->placeholder('-'),
                TextEntry::make('site_logo')
                    ->placeholder('-'),
                TextEntry::make('address')
                    ->placeholder('-'),
                TextEntry::make('whatsapp_number')
                    ->placeholder('-'),
                TextEntry::make('about_us')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('about_text')
                    ->label('About Text')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('mission')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('vision')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('terms_and_conditions')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('privacy_policy')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('description')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('payment_terms')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
            ]);
    }
}
