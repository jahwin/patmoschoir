<?php

namespace App\Filament\Resources\SiteContents;

use App\Filament\Resources\SiteContents\Pages\EditSiteContents;
use App\Filament\Resources\SiteContents\Pages\ManageSiteContents;
use App\Filament\Resources\SiteContents\Schemas\SiteContentsForm;
use App\Filament\Resources\SiteContents\Tables\SiteContentsTable;
use App\Models\SiteContent;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use UnitEnum;

class SiteContentsResource extends Resource
{
    protected static ?string $model = SiteContent::class;

    protected static string|BackedEnum|null $navigationIcon = 'lucide-settings';

    protected static ?string $navigationLabel = 'Settings';

    protected static ?string $modelLabel = 'Site Settings';

    protected static ?string $pluralModelLabel = 'Site Settings';

    protected static UnitEnum|string|null $navigationGroup = 'Settings';

    protected static ?int $navigationSort = 10;

    public static function form(Schema $schema): Schema
    {
        return SiteContentsForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return SiteContentsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ManageSiteContents::route('/'),
            'edit' => EditSiteContents::route('/{record}/edit'),
        ];
    }

    public static function getGlobalSearchResultTitle($record): string
    {
        return 'Site Content Settings';
    }

    public static function getGlobalSearchResultDetails($record): array
    {
        return [
            'Site Name' => $record->site_name ?? 'Not set',
            'Address' => $record->address ?? 'Not set',
            'Description' => $record->description ? substr($record->description, 0, 50) . '...' : 'Not set',
        ];
    }

    public static function getGloballySearchableAttributes(): array
    {
        return ['site_name', 'address', 'description', 'about_title', 'about_text', 'footer_text', 'hero_title'];
    }
}
