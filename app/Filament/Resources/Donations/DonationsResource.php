<?php

namespace App\Filament\Resources\Donations;

use App\Filament\Resources\Donations\Pages\ListDonations;
use App\Filament\Resources\Donations\Pages\ViewDonations;
use App\Filament\Resources\Donations\Schemas\DonationsInfolist;
use App\Filament\Resources\Donations\Tables\DonationsTable;
use App\Models\Donation;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use UnitEnum;

class DonationsResource extends Resource
{
    protected static ?string $model = Donation::class;

    protected static string|BackedEnum|null $navigationIcon = 'lucide-hand-coins';

    protected static ?string $navigationLabel = 'Donations';

    protected static ?string $modelLabel = 'Donation';

    protected static ?string $pluralModelLabel = 'Donations';

    protected static UnitEnum|string|null $navigationGroup = 'Inquiries';

    protected static ?int $navigationSort = 3;

    protected static ?string $recordTitleAttribute = 'name';

    public static function infolist(Schema $schema): Schema
    {
        return DonationsInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return DonationsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListDonations::route('/'),
            'view'  => ViewDonations::route('/{record}'),
        ];
    }

    public static function getGloballySearchableAttributes(): array
    {
        return ['name', 'email', 'phone'];
    }
}
