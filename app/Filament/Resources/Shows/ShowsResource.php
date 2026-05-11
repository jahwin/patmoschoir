<?php

namespace App\Filament\Resources\Shows;

use App\Filament\Resources\Shows\Pages\CreateShows;
use App\Filament\Resources\Shows\Pages\EditShows;
use App\Filament\Resources\Shows\Pages\ListShows;
use App\Filament\Resources\Shows\Pages\ViewShows;
use App\Filament\Resources\Shows\Schemas\ShowsForm;
use App\Filament\Resources\Shows\Schemas\ShowsInfolist;
use App\Filament\Resources\Shows\Tables\ShowsTable;
use App\Models\Show;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use UnitEnum;

class ShowsResource extends Resource
{
    protected static ?string $model = Show::class;

    protected static string|BackedEnum|null $navigationIcon = 'lucide-ticket';

    protected static UnitEnum|string|null $navigationGroup = 'Events';

    protected static ?int $navigationSort = 1;

    protected static ?string $recordTitleAttribute = 'venue';

    public static function form(Schema $schema): Schema
    {
        return ShowsForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return ShowsInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ShowsTable::configure($table);
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
            'index' => ListShows::route('/'),
            'create' => CreateShows::route('/create'),
            'view' => ViewShows::route('/{record}'),
            'edit' => EditShows::route('/{record}/edit'),
        ];
    }
}
