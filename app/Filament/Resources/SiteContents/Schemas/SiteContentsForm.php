<?php

namespace App\Filament\Resources\SiteContents\Schemas;

use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\KeyValue;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;

class SiteContentsForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('Settings')
                    ->tabs([
                        // General Settings Tab
                        Tab::make('General')
                            ->icon('heroicon-o-cog-6-tooth')
                            ->schema([
                                TextInput::make('site_name')
                                    ->label('Site Name')
                                    ->placeholder('Enter site name')
                                    ->maxLength(255)
                                    ->columnSpanFull(),

                                ColorPicker::make('site_color')
                                    ->label('Site Color')
                                    ->placeholder('Select site color')
                                    ->columnSpanFull(),

                                FileUpload::make('site_logo')
                                    ->label('Site Logo')
                                    ->image()
                                    ->placeholder('Upload site logo')
                                    ->imageEditor()
                                    ->imageEditorMode(2)
                                    ->imageEditorAspectRatios([
                                        null,
                                        '16:9',
                                        '4:3',
                                        '1:1',
                                    ])
                                    ->maxSize(2048)
                                    ->directory('site/logo')
                                    ->visibility('public')
                                    ->columnSpanFull(),

                                TextInput::make('origin_domain')
                                    ->label('Origin Domain')
                                    ->placeholder('Enter origin domain (e.g., example.com)')
                                    ->maxLength(255)
                                    ->columnSpanFull(),
                            ]),

                        // Contact Information Tab
                        Tab::make('Contact')
                            ->icon('heroicon-o-phone')
                            ->schema([
                                TextInput::make('address')
                                    ->label('Address')
                                    ->placeholder('Enter company address')
                                    ->maxLength(255)
                                    ->columnSpanFull(),

                                TextInput::make('whatsapp_number')
                                    ->label('WhatsApp Number')
                                    ->placeholder('Enter WhatsApp number')
                                    ->tel()
                                    ->maxLength(255)
                                    ->columnSpanFull(),

                                TagsInput::make('phones')
                                    ->label('Phone Numbers')
                                    ->placeholder('Enter phone numbers separated by commas')
                                    ->separator(',')
                                    ->columnSpanFull(),

                                TagsInput::make('emails')
                                    ->label('Email Addresses')
                                    ->placeholder('Enter email addresses separated by commas')
                                    ->separator(',')
                                    ->columnSpanFull(),

                                Repeater::make('social_links')
                                    ->label('Social Media Links')
                                    ->schema([
                                        TextInput::make('platform')
                                            ->label('Platform')
                                            ->placeholder('e.g., Facebook, Twitter, Instagram')
                                            ->required()
                                            ->maxLength(255)
                                            ->columnSpan(1),
                                        TextInput::make('url')
                                            ->label('URL')
                                            ->placeholder('Enter social media URL')
                                            ->url()
                                            ->required()
                                            ->maxLength(255)
                                            ->columnSpan(1),
                                    ])
                                    ->columns(2)
                                    ->addActionLabel('Add Social Link')
                                    ->defaultItems(0)
                                    ->collapsible()
                                    ->columnSpanFull(),
                            ]),

                        // About Us Tab
                        Tab::make('About Us')
                            ->icon('heroicon-o-information-circle')
                            ->schema([
                                RichEditor::make('about_us')
                                    ->label('About Us')
                                    ->placeholder('Enter company description')
                                    ->toolbarButtons([
                                        'bold',
                                        'italic',
                                        'underline',
                                        'strike',
                                        'link',
                                        'bulletList',
                                        'orderedList',
                                        'h2',
                                        'h3',
                                        'blockquote',
                                        'codeBlock',
                                    ])
                                    ->columnSpanFull(),

                                Textarea::make('about_text')
                                    ->label('About Text')
                                    ->placeholder('Enter additional about text')
                                    ->rows(4)
                                    ->columnSpanFull(),

                                FileUpload::make('about_image')
                                    ->label('About Image')
                                    ->image()
                                    ->placeholder('Upload about section image')
                                    ->imageEditor()
                                    ->imageEditorMode(2)
                                    ->imageEditorAspectRatios([
                                        null,
                                        '16:9',
                                        '4:3',
                                        '1:1',
                                    ])
                                    ->maxSize(2048)
                                    ->directory('site/about')
                                    ->columnSpanFull(),

                                FileUpload::make('subimage')
                                    ->label('Subimage')
                                    ->image()
                                    ->placeholder('Upload subimage for pages')
                                    ->imageEditor()
                                    ->imageEditorMode(2)
                                    ->imageEditorAspectRatios([
                                        null,
                                        '16:9',
                                        '4:3',
                                        '1:1',
                                    ])
                                    ->maxSize(2048)
                                    ->directory('site/subimages')
                                    ->columnSpanFull(),

                                Textarea::make('mission')
                                    ->label('Mission')
                                    ->placeholder('Enter company mission')
                                    ->rows(3)
                                    ->columnSpanFull(),

                                Textarea::make('vision')
                                    ->label('Vision')
                                    ->placeholder('Enter company vision')
                                    ->rows(3)
                                    ->columnSpanFull(),

                                Repeater::make('values')
                                    ->label('Company Values')
                                    ->schema([
                                        TextInput::make('title')
                                            ->label('Title')
                                            ->placeholder('Enter value title (e.g., Integrity, Excellence)')
                                            ->required()
                                            ->maxLength(255)
                                            ->columnSpan(1),
                                        Textarea::make('description')
                                            ->label('Description')
                                            ->placeholder('Enter value description')
                                            ->required()
                                            ->rows(3)
                                            ->columnSpan(1),
                                        Textarea::make('icon')
                                            ->label('Icon (SVG)')
                                            ->placeholder('Enter SVG icon code')
                                            ->rows(4)
                                            ->helperText('Paste the SVG code for the icon. Example: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">...</svg>')
                                            ->columnSpanFull(),
                                    ])
                                    ->columns(2)
                                    ->addActionLabel('Add Value')
                                    ->defaultItems(0)
                                    ->collapsible()
                                    ->columnSpanFull(),

                                Repeater::make('faqs')
                                    ->label('Frequently Asked Questions')
                                    ->schema([
                                        TextInput::make('question')
                                            ->label('Question')
                                            ->placeholder('Enter FAQ question')
                                            ->required()
                                            ->maxLength(255)
                                            ->columnSpan(1),
                                        Textarea::make('answer')
                                            ->label('Answer')
                                            ->placeholder('Enter FAQ answer')
                                            ->required()
                                            ->rows(3)
                                            ->columnSpan(1),
                                    ])
                                    ->columns(2)
                                    ->addActionLabel('Add FAQ')
                                    ->defaultItems(0)
                                    ->collapsible()
                                    ->columnSpanFull(),
                            ]),

                        // Legal & Policies Tab
                        Tab::make('Legal & Policies')
                            ->icon('heroicon-o-document-text')
                            ->schema([
                                RichEditor::make('terms_and_conditions')
                                    ->label('Terms and Conditions')
                                    ->placeholder('Enter terms and conditions')
                                    ->toolbarButtons([
                                        'bold',
                                        'italic',
                                        'underline',
                                        'strike',
                                        'link',
                                        'bulletList',
                                        'orderedList',
                                        'h2',
                                        'h3',
                                        'blockquote',
                                        'codeBlock',
                                    ])
                                    ->columnSpanFull(),

                                RichEditor::make('privacy_policy')
                                    ->label('Privacy Policy')
                                    ->placeholder('Enter privacy policy')
                                    ->toolbarButtons([
                                        'bold',
                                        'italic',
                                        'underline',
                                        'strike',
                                        'link',
                                        'bulletList',
                                        'orderedList',
                                        'h2',
                                        'h3',
                                        'blockquote',
                                        'codeBlock',
                                    ])
                                    ->columnSpanFull(),

                                RichEditor::make('payment_terms')
                                    ->label('Payment Terms')
                                    ->placeholder('Enter payment terms and conditions')
                                    ->toolbarButtons([
                                        'bold',
                                        'italic',
                                        'underline',
                                        'strike',
                                        'link',
                                        'bulletList',
                                        'orderedList',
                                        'h2',
                                        'h3',
                                        'blockquote',
                                        'codeBlock',
                                    ])
                                    ->columnSpanFull(),
                            ]),

                        // SEO & Footer Tab
                        Tab::make('SEO & Footer')
                            ->icon('heroicon-o-magnifying-glass')
                            ->schema([
                                Textarea::make('description')
                                    ->label('Site Description')
                                    ->placeholder('Enter site description for SEO')
                                    ->rows(3)
                                    ->columnSpanFull(),

                                TagsInput::make('keywords')
                                    ->label('SEO Keywords')
                                    ->placeholder('Enter keywords separated by commas')
                                    ->separator(',')
                                    ->columnSpanFull(),

                                RichEditor::make('footer_text')
                                    ->label('Footer Text')
                                    ->placeholder('Enter footer text content')
                                    ->toolbarButtons([
                                        'bold',
                                        'italic',
                                        'underline',
                                        'strike',
                                        'link',
                                        'bulletList',
                                        'orderedList',
                                        'h2',
                                        'h3',
                                        'blockquote',
                                        'codeBlock',
                                    ])
                                    ->columnSpanFull(),
                            ]),

                        // Page Settings Tab
                        Tab::make('Page Settings')
                            ->icon('heroicon-o-squares-2x2')
                            ->schema([
                                TextInput::make('services_page_title')
                                    ->label('Services Page Title')
                                    ->placeholder('Enter services page title (e.g., Our Ministry)')
                                    ->maxLength(255)
                                    ->columnSpanFull(),

                                TextInput::make('services_page_subtitle')
                                    ->label('Services Page Subtitle')
                                    ->placeholder('Enter services page subtitle')
                                    ->maxLength(255)
                                    ->columnSpanFull(),

                                Textarea::make('services_page_description')
                                    ->label('Services Page Description')
                                    ->placeholder('Enter services page description')
                                    ->rows(4)
                                    ->columnSpanFull(),

                                FileUpload::make('services_page_background_image')
                                    ->label('Services Page Background Image')
                                    ->image()
                                    ->placeholder('Upload background image for services page')
                                    ->imageEditor()
                                    ->imageEditorMode(2)
                                    ->imageEditorAspectRatios([
                                        null,
                                        '16:9',
                                        '4:3',
                                        '1:1',
                                    ])
                                    ->maxSize(2048)
                                    ->directory('site/services')
                                    ->visibility('public')
                                    ->columnSpanFull(),
                            ]),

                        // Home Page Tab
                        Tab::make('Home Page')
                            ->icon('heroicon-o-home')
                            ->schema([
                                FileUpload::make('home_about_background_image')
                                    ->label('Home About Background Image')
                                    ->image()
                                    ->placeholder('Upload background image for home About section')
                                    ->imageEditor()
                                    ->imageEditorMode(2)
                                    ->imageEditorAspectRatios([
                                        null,
                                        '16:9',
                                        '4:3',
                                        '1:1',
                                    ])
                                    ->maxSize(2048)
                                    ->directory('site/home/about')
                                    ->visibility('public')
                                    ->columnSpanFull(),

                                FileUpload::make('home_music_background_image')
                                    ->label('Home Music Background Image')
                                    ->image()
                                    ->placeholder('Upload background image for home Music section')
                                    ->imageEditor()
                                    ->imageEditorMode(2)
                                    ->imageEditorAspectRatios([
                                        null,
                                        '16:9',
                                        '4:3',
                                        '1:1',
                                    ])
                                    ->maxSize(2048)
                                    ->directory('site/home/music')
                                    ->visibility('public')
                                    ->columnSpanFull(),

                                FileUpload::make('home_videos_background_image')
                                    ->label('Home Videos Background Image')
                                    ->image()
                                    ->placeholder('Upload background image for home Videos section')
                                    ->imageEditor()
                                    ->imageEditorMode(2)
                                    ->imageEditorAspectRatios([
                                        null,
                                        '16:9',
                                        '4:3',
                                        '1:1',
                                    ])
                                    ->maxSize(2048)
                                    ->directory('site/home/videos')
                                    ->visibility('public')
                                    ->columnSpanFull(),

                                FileUpload::make('home_news_background_image')
                                    ->label('Home News Background Image')
                                    ->image()
                                    ->placeholder('Upload background image for home News section')
                                    ->imageEditor()
                                    ->imageEditorMode(2)
                                    ->imageEditorAspectRatios([
                                        null,
                                        '16:9',
                                        '4:3',
                                        '1:1',
                                    ])
                                    ->maxSize(2048)
                                    ->directory('site/home/news')
                                    ->visibility('public')
                                    ->columnSpanFull(),
                            ]),
                    ])
                    ->columnSpanFull(),
            ]);
    }
}
