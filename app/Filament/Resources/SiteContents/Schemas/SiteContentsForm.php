<?php

namespace App\Filament\Resources\SiteContents\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
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
                        Tab::make('General')
                            ->icon('heroicon-o-cog-6-tooth')
                            ->schema([
                                TextInput::make('site_name')
                                    ->label('Site Name')
                                    ->placeholder('Enter site name')
                                    ->maxLength(255)
                                    ->columnSpanFull(),

                                FileUpload::make('site_logo')
                                    ->label('Site Logo')
                                    ->image()
                                    ->placeholder('Upload site logo')
                                    ->imageEditor()
                                    ->imageEditorMode(2)
                                    ->imageEditorAspectRatios([null, '16:9', '4:3', '1:1'])
                                    ->maxSize(2048)
                                    ->directory('site/logo')
                                    ->visibility('public')
                                    ->columnSpanFull(),
                            ]),

                        Tab::make('Hero')
                            ->icon('heroicon-o-sparkles')
                            ->schema([
                                FileUpload::make('hero_background_images')
                                    ->label('Hero Background Images')
                                    ->image()
                                    ->multiple()
                                    ->reorderable()
                                    ->panelLayout('grid')
                                    ->panelAspectRatio('16:9')
                                    ->imagePreviewHeight('80')
                                    ->imageEditor()
                                    ->imageEditorAspectRatios([null, '16:9', '4:3', '1:1'])
                                    ->maxSize(4096)
                                    ->directory('site/hero')
                                    ->visibility('public')
                                    ->columnSpanFull(),

                                TextInput::make('hero_title')
                                    ->label('Hero Title')
                                    ->placeholder('Enter hero section title')
                                    ->maxLength(255)
                                    ->columnSpanFull(),

                                TextInput::make('hero_subtitle')
                                    ->label('Hero Subtitle')
                                    ->placeholder('Enter hero section subtitle')
                                    ->maxLength(255)
                                    ->columnSpanFull(),

                                Textarea::make('hero_description')
                                    ->label('Hero Description')
                                    ->placeholder('Enter hero section description')
                                    ->rows(3)
                                    ->columnSpanFull(),

                                Textarea::make('hero_subdescription')
                                    ->label('Hero Sub-description')
                                    ->placeholder('Enter hero section sub-description')
                                    ->rows(3)
                                    ->columnSpanFull(),
                            ]),

                        Tab::make('About Us')
                            ->icon('heroicon-o-information-circle')
                            ->schema([
                                TextInput::make('about_title')
                                    ->label('About Title')
                                    ->placeholder('Enter about section title')
                                    ->maxLength(255)
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
                                    ->imageEditorAspectRatios([null, '16:9', '4:3', '1:1'])
                                    ->maxSize(2048)
                                    ->directory('site/about')
                                    ->columnSpanFull(),

                                FileUpload::make('subimage')
                                    ->label('Subimage')
                                    ->image()
                                    ->placeholder('Upload subimage for pages')
                                    ->imageEditor()
                                    ->imageEditorMode(2)
                                    ->imageEditorAspectRatios([null, '16:9', '4:3', '1:1'])
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
                                    ])
                                    ->columns(2)
                                    ->addActionLabel('Add Value')
                                    ->defaultItems(0)
                                    ->collapsible()
                                    ->columnSpanFull(),

                                Repeater::make('storyline')
                                    ->label('Storyline')
                                    ->schema([
                                        TextInput::make('year')
                                            ->label('Time')
                                            ->placeholder('e.g., 2020, 2018–2020, Early 2022')
                                            ->maxLength(20)
                                            ->columnSpan(1),
                                        TextInput::make('title')
                                            ->label('Title')
                                            ->placeholder('e.g., Founded, First Album Release')
                                            ->required()
                                            ->maxLength(255)
                                            ->columnSpan(1),
                                        Textarea::make('description')
                                            ->label('Description')
                                            ->placeholder('Enter storyline event description')
                                            ->required()
                                            ->rows(3)
                                            ->columnSpanFull(),
                                    ])
                                    ->columns(2)
                                    ->addActionLabel('Add Storyline Entry')
                                    ->defaultItems(0)
                                    ->collapsible()
                                    ->columnSpanFull(),

                                FileUpload::make('about_poster')
                                    ->label('About Poster')
                                    ->image()
                                    ->placeholder('Upload about poster image')
                                    ->imageEditor()
                                    ->imageEditorMode(2)
                                    ->imageEditorAspectRatios([null, '16:9', '4:3', '1:1'])
                                    ->maxSize(2048)
                                    ->directory('site/about/poster')
                                    ->columnSpanFull(),
                            ]),

                        Tab::make('Donation')
                            ->icon('heroicon-o-heart')
                            ->schema([
                                TextInput::make('donation_title')
                                    ->label('Donation Title')
                                    ->placeholder('Enter donation section title')
                                    ->maxLength(255)
                                    ->columnSpanFull(),

                                Textarea::make('donation_description')
                                    ->label('Donation Description')
                                    ->placeholder('Enter donation section description')
                                    ->rows(3)
                                    ->columnSpanFull(),

                                Textarea::make('donation_subdescription')
                                    ->label('Donation Sub-description')
                                    ->placeholder('Enter donation section sub-description')
                                    ->rows(3)
                                    ->columnSpanFull(),

                                TextInput::make('card_title')
                                    ->label('Card Title')
                                    ->placeholder('Enter donation card title')
                                    ->maxLength(255)
                                    ->columnSpanFull(),

                                Textarea::make('card_description')
                                    ->label('Card Description')
                                    ->placeholder('Enter donation card description')
                                    ->rows(3)
                                    ->columnSpanFull(),

                                Repeater::make('amounts')
                                    ->label('Preset Donation Amounts')
                                    ->schema([
                                        TextInput::make('amount')
                                            ->label('Amount')
                                            ->placeholder('e.g., 10, 5000')
                                            ->numeric()
                                            ->required()
                                            ->minValue(1)
                                            ->columnSpan(1),
                                        Select::make('currency')
                                            ->label('Currency')
                                            ->options([
                                                'USD' => 'USD',
                                                'RWF' => 'RWF',
                                            ])
                                            ->required()
                                            ->default('USD')
                                            ->columnSpan(1),
                                    ])
                                    ->columns(2)
                                    ->addActionLabel('Add Amount')
                                    ->defaultItems(0)
                                    ->collapsible()
                                    ->columnSpanFull(),
                            ]),

                        Tab::make('Contact')
                            ->icon('heroicon-o-phone')
                            ->schema([
                                TextInput::make('address')
                                    ->label('Address')
                                    ->placeholder('Enter company address')
                                    ->maxLength(255)
                                    ->columnSpanFull(),

                                TagsInput::make('phones')
                                    ->label('Phone Numbers')
                                    ->placeholder('Enter phone numbers separated by commas')
                                    ->separator(',')
                                    ->columnSpanFull(),

                                Repeater::make('emails')
                                    ->label('Email Addresses')
                                    ->schema([
                                        TextInput::make('title')
                                            ->label('Title')
                                            ->placeholder('e.g., Support, Bookings, General')
                                            ->required()
                                            ->maxLength(255)
                                            ->columnSpan(1),
                                        TextInput::make('value')
                                            ->label('Email')
                                            ->placeholder('e.g., info@example.com')
                                            ->email()
                                            ->required()
                                            ->maxLength(255)
                                            ->columnSpan(1),
                                    ])
                                    ->columns(2)
                                    ->addActionLabel('Add Email')
                                    ->defaultItems(0)
                                    ->collapsible()
                                    ->columnSpanFull(),

                                Repeater::make('social_links')
                                    ->label('Social Media Links')
                                    ->schema([
                                        Select::make('platform')
                                            ->label('Platform')
                                            ->options([
                                                'FACEBOOK'  => 'FACEBOOK',
                                                'INSTAGRAM' => 'INSTAGRAM',
                                                'TWITTER'   => 'TWITTER',
                                                'YOUTUBE'   => 'YOUTUBE',
                                                'TIKTOK'    => 'TIKTOK',
                                                'SPOTIFY'   => 'SPOTIFY',
                                                'WHATSAPP'  => 'WHATSAPP',
                                                'SOUNDCLOUD' => 'SOUNDCLOUD',
                                                'APPLE_MUSIC' => 'APPLE_MUSIC'
                                            ])
                                            ->required()
                                            ->searchable()
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

                        Tab::make('Legal & Policies')
                            ->icon('heroicon-o-document-text')
                            ->hidden()
                            ->schema([
                                RichEditor::make('terms_and_conditions')
                                    ->label('Terms and Conditions')
                                    ->placeholder('Enter terms and conditions')
                                    ->toolbarButtons(['bold', 'italic', 'underline', 'strike', 'link', 'bulletList', 'orderedList', 'h2', 'h3', 'blockquote', 'codeBlock'])
                                    ->columnSpanFull(),

                                RichEditor::make('privacy_policy')
                                    ->label('Privacy Policy')
                                    ->placeholder('Enter privacy policy')
                                    ->toolbarButtons(['bold', 'italic', 'underline', 'strike', 'link', 'bulletList', 'orderedList', 'h2', 'h3', 'blockquote', 'codeBlock'])
                                    ->columnSpanFull(),

                                RichEditor::make('payment_terms')
                                    ->label('Payment Terms')
                                    ->placeholder('Enter payment terms and conditions')
                                    ->toolbarButtons(['bold', 'italic', 'underline', 'strike', 'link', 'bulletList', 'orderedList', 'h2', 'h3', 'blockquote', 'codeBlock'])
                                    ->columnSpanFull(),
                            ]),

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
                                    ->toolbarButtons(['bold', 'italic', 'underline', 'strike', 'link', 'bulletList', 'orderedList', 'h2', 'h3', 'blockquote', 'codeBlock'])
                                    ->columnSpanFull(),
                            ]),

                        Tab::make('Home Page')
                            ->icon('heroicon-o-home')
                            ->schema([
                                FileUpload::make('home_about_background_image')
                                    ->label('Home About Background Image')
                                    ->image()
                                    ->placeholder('Upload background image for home About section')
                                    ->imageEditor()
                                    ->imageEditorMode(2)
                                    ->imageEditorAspectRatios([null, '16:9', '4:3', '1:1'])
                                    ->maxSize(2048)
                                    ->directory('site/home/about')
                                    ->visibility('public')
                                    ->columnSpanFull(),

                                FileUpload::make('home_events_background_image')
                                    ->label('Home Events Background Image')
                                    ->image()
                                    ->placeholder('Upload background image for home Events section')
                                    ->imageEditor()
                                    ->imageEditorMode(2)
                                    ->imageEditorAspectRatios([null, '16:9', '4:3', '1:1'])
                                    ->maxSize(2048)
                                    ->directory('site/home/events')
                                    ->visibility('public')
                                    ->columnSpanFull(),

                                FileUpload::make('home_gallery_background_image')
                                    ->label('Home Gallery Background Image')
                                    ->image()
                                    ->placeholder('Upload background image for home Gallery section')
                                    ->imageEditor()
                                    ->imageEditorMode(2)
                                    ->imageEditorAspectRatios([null, '16:9', '4:3', '1:1'])
                                    ->maxSize(2048)
                                    ->directory('site/home/gallery')
                                    ->visibility('public')
                                    ->columnSpanFull(),

                                FileUpload::make('home_footer_background_image')
                                    ->label('Home Footer Background Image')
                                    ->image()
                                    ->placeholder('Upload background image for home Footer section')
                                    ->imageEditor()
                                    ->imageEditorMode(2)
                                    ->imageEditorAspectRatios([null, '16:9', '4:3', '1:1'])
                                    ->maxSize(2048)
                                    ->directory('site/home/footer')
                                    ->visibility('public')
                                    ->columnSpanFull(),
                            ]),
                    ])
                    ->columnSpanFull(),
            ]);
    }
}
