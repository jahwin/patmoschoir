<?php

namespace App\Filament\Resources\SiteContents;

use App\Filament\Resources\SiteContents\Pages\CreateSiteContent;
use App\Filament\Resources\SiteContents\Pages\EditSiteContent;
use App\Filament\Resources\SiteContents\Pages\ListSiteContents;
use App\Filament\Resources\SiteContents\Pages\ViewSiteContent;
use App\Filament\Resources\SiteContents\Schemas\SiteContentForm;
use App\Filament\Resources\SiteContents\Schemas\SiteContentInfolist;
use App\Filament\Resources\SiteContents\Tables\SiteContentsTable;
use App\Models\SiteContent;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class SiteContentResource extends Resource
{
    protected static ?string $model = SiteContent::class;

    protected static bool $shouldRegisterNavigation = false;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return SiteContentForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return SiteContentInfolist::configure($schema);
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
            'index' => ListSiteContents::route('/'),
            'create' => CreateSiteContent::route('/create'),
            'view' => ViewSiteContent::route('/{record}'),
            'edit' => EditSiteContent::route('/{record}/edit'),
        ];
    }
}
