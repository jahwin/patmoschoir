<?php

namespace App\Filament\Resources\Streamings;

use App\Filament\Resources\Streamings\Pages\CreateStreamings;
use App\Filament\Resources\Streamings\Pages\EditStreamings;
use App\Filament\Resources\Streamings\Pages\ListStreamings;
use App\Filament\Resources\Streamings\Schemas\StreamingsForm;
use App\Filament\Resources\Streamings\Tables\StreamingsTable;
use App\Models\Streaming;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;

class StreamingsResource extends Resource
{
    protected static ?string $model = Streaming::class;

    protected static string|BackedEnum|null $navigationIcon = 'lucide-radio';

    protected static ?string $navigationLabel = 'Live Streams';

    protected static ?string $modelLabel = 'Live Stream';

    protected static ?string $pluralModelLabel = 'Live Streams';

    protected static ?int $navigationSort = 4;

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return StreamingsForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return StreamingsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index'  => ListStreamings::route('/'),
            'create' => CreateStreamings::route('/create'),
            'edit'   => EditStreamings::route('/{record}/edit'),
        ];
    }

    public static function getGloballySearchableAttributes(): array
    {
        return ['title', 'description', 'location', 'stream_id'];
    }
}
