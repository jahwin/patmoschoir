<?php

namespace App\Filament\Resources\Albums;

use App\Filament\Resources\Albums\Pages\CreateAlbums;
use App\Filament\Resources\Albums\Pages\EditAlbums;
use App\Filament\Resources\Albums\Pages\ListAlbums;
use App\Filament\Resources\Albums\Schemas\AlbumsForm;
use App\Filament\Resources\Albums\Tables\AlbumsTable;
use App\Models\Playlist;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;

class AlbumsResource extends Resource
{
    protected static ?string $model = Playlist::class;

    protected static string|BackedEnum|null $navigationIcon = 'lucide-disc-3';

    protected static ?string $navigationLabel = 'Albums';

    protected static ?string $modelLabel = 'Album';

    protected static ?string $pluralModelLabel = 'Albums';

    protected static ?int $navigationSort = 2;

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Schema $schema): Schema
    {
        return AlbumsForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return AlbumsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index'  => ListAlbums::route('/'),
            'create' => CreateAlbums::route('/create'),
            'edit'   => EditAlbums::route('/{record}/edit'),
        ];
    }

    public static function getGloballySearchableAttributes(): array
    {
        return ['name', 'description', 'year'];
    }
}
