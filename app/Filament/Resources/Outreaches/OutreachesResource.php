<?php

namespace App\Filament\Resources\Outreaches;

use App\Filament\Resources\Outreaches\Pages\CreateOutreaches;
use App\Filament\Resources\Outreaches\Pages\EditOutreaches;
use App\Filament\Resources\Outreaches\Pages\ListOutreaches;
use App\Filament\Resources\Outreaches\Schemas\OutreachesForm;
use App\Filament\Resources\Outreaches\Tables\OutreachesTable;
use App\Models\Outreach;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;

class OutreachesResource extends Resource
{
    protected static ?string $model = Outreach::class;

    protected static string|BackedEnum|null $navigationIcon = 'lucide-heart-handshake';

    protected static ?string $navigationLabel = 'Outreaches';

    protected static ?string $modelLabel = 'Outreach';

    protected static ?string $pluralModelLabel = 'Outreaches';

    protected static ?int $navigationSort = 6;

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return OutreachesForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return OutreachesTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index'  => ListOutreaches::route('/'),
            'create' => CreateOutreaches::route('/create'),
            'edit'   => EditOutreaches::route('/{record}/edit'),
        ];
    }

    public static function getGloballySearchableAttributes(): array
    {
        return ['title', 'description', 'location'];
    }
}
