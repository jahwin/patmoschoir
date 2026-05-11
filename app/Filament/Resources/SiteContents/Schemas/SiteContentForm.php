<?php

namespace App\Filament\Resources\SiteContents\Schemas;

use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class SiteContentForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('site_name')
                    ->label('Site Name'),
                ColorPicker::make('site_color')
                    ->label('Site Color'),
                TextInput::make('site_logo'),
                TextInput::make('social_links'),
                TextInput::make('address'),
                TextInput::make('whatsapp_number'),
                TagsInput::make('phones')
                    ->label('Phone Numbers')
                    ->placeholder('Enter phone numbers separated by commas')
                    ->separator(','),
                TagsInput::make('emails')
                    ->label('Email Addresses')
                    ->placeholder('Enter email addresses separated by commas')
                    ->separator(','),
                TextInput::make('faqs'),
                Textarea::make('about_us')
                    ->columnSpanFull(),
                Textarea::make('about_text')
                    ->columnSpanFull(),
                TextInput::make('about_image'),
                TextInput::make('subimage')
                    ->label('Subimage'),
                TextInput::make('origin_domain')
                    ->label('Origin Domain'),
                Textarea::make('mission')
                    ->columnSpanFull(),
                Textarea::make('vision')
                    ->columnSpanFull(),
                Textarea::make('terms_and_conditions')
                    ->columnSpanFull(),
                Textarea::make('privacy_policy')
                    ->columnSpanFull(),
                TagsInput::make('keywords')
                    ->label('SEO Keywords')
                    ->placeholder('Enter keywords separated by commas')
                    ->separator(','),
                Textarea::make('description')
                    ->columnSpanFull(),
                Textarea::make('payment_terms')
                    ->columnSpanFull(),
                Textarea::make('footer_text')
                    ->columnSpanFull(),
            ]);
    }
}
