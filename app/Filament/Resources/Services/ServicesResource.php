<?php

namespace App\Filament\Resources\Services;

use App\Filament\Resources\Services\Pages\CreateServices;
use App\Filament\Resources\Services\Pages\EditServices;
use App\Filament\Resources\Services\Pages\ListServices;
use App\Filament\Resources\Services\Pages\ViewServices;
use App\Filament\Resources\Services\Schemas\ServicesForm;
use App\Filament\Resources\Services\Schemas\ServicesInfolist;
use App\Filament\Resources\Services\Tables\ServicesTable;
use App\Models\Services;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class ServicesResource extends Resource
{
    protected static ?string $model = Services::class;

    protected static string|BackedEnum|null $navigationIcon = 'lucide-list-checks';

    protected static ?string $recordTitleAttribute = 'title';

    protected static UnitEnum|string|null $navigationGroup = 'Content Management';

    protected static ?int $navigationSort = 2;

    public static function form(Schema $schema): Schema
    {
        return ServicesForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return ServicesInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ServicesTable::configure($table);
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
            'index' => ListServices::route('/'),
            'create' => CreateServices::route('/create'),
            'view' => ViewServices::route('/{record}'),
            'edit' => EditServices::route('/{record}/edit'),
        ];
    }
}
