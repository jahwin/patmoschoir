<?php

namespace App\Filament\Resources\Events;

use App\Filament\Resources\Events\Pages\CreateEvents;
use App\Filament\Resources\Events\Pages\EditEvents;
use App\Filament\Resources\Events\Pages\ListEvents;
use App\Filament\Resources\Events\Pages\ViewEvents;
use App\Filament\Resources\Events\Schemas\EventsForm;
use App\Filament\Resources\Events\Schemas\EventsInfolist;
use App\Filament\Resources\Events\Tables\EventsTable;
use App\Models\Events;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;

class EventsResource extends Resource
{
    protected static ?string $model = Events::class;

    protected static ?string $slug = 'events';

    protected static ?string $modelLabel = 'Event';

    protected static ?string $pluralModelLabel = 'Events';

    protected static string|BackedEnum|null $navigationIcon = 'lucide-ticket';

    protected static ?int $navigationSort = 1;

    protected static ?string $navigationLabel = 'Events';

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return EventsForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return EventsInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return EventsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListEvents::route('/'),
            'create' => CreateEvents::route('/create'),
            'view' => ViewEvents::route('/{record}'),
            'edit' => EditEvents::route('/{record}/edit'),
        ];
    }
}
