<?php

namespace App\Filament\Resources\JoinUs;

use App\Filament\Resources\JoinUs\Pages\ListJoinUs;
use App\Filament\Resources\JoinUs\Pages\ViewJoinUs;
use App\Filament\Resources\JoinUs\Schemas\JoinUsInfolist;
use App\Filament\Resources\JoinUs\Tables\JoinUsTable;
use App\Models\JoinUs as JoinUsModel;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use UnitEnum;

class JoinUsResource extends Resource
{
    protected static ?string $model = JoinUsModel::class;

    protected static string|BackedEnum|null $navigationIcon = 'lucide-user-plus';

    protected static ?string $navigationLabel = 'Join Us';

    protected static ?string $modelLabel = 'Join Us Request';

    protected static ?string $pluralModelLabel = 'Join Us Requests';

    protected static UnitEnum|string|null $navigationGroup = 'Inquiries';

    protected static ?int $navigationSort = 2;

    protected static ?string $recordTitleAttribute = 'first_name';

    public static function infolist(Schema $schema): Schema
    {
        return JoinUsInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return JoinUsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListJoinUs::route('/'),
            'view'  => ViewJoinUs::route('/{record}'),
        ];
    }

    public static function getGloballySearchableAttributes(): array
    {
        return ['first_name', 'last_name', 'email', 'phone', 'country', 'city'];
    }
}
