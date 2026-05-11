<?php

namespace App\Filament\Resources\Video;

use App\Filament\Resources\Video\Pages\CreateVideo;
use App\Filament\Resources\Video\Pages\EditVideo;
use App\Filament\Resources\Video\Pages\ListVideo;
use App\Filament\Resources\Video\Pages\ViewVideo;
use App\Filament\Resources\Video\Schemas\VideoForm;
use App\Filament\Resources\Video\Schemas\VideoInfolist;
use App\Filament\Resources\Video\Tables\VideoTable;
use App\Models\Video;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use UnitEnum;

class VideoResource extends Resource
{
    protected static ?string $model = Video::class;

    protected static string|BackedEnum|null $navigationIcon = 'lucide-video';

    protected static ?string $recordTitleAttribute = 'id';

    protected static UnitEnum|string|null $navigationGroup = 'Media';

    protected static ?int $navigationSort = 2;

    public static function form(Schema $schema): Schema
    {
        return VideoForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return VideoInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return VideoTable::configure($table);
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
            'index' => ListVideo::route('/'),
            'create' => CreateVideo::route('/create'),
            'view' => ViewVideo::route('/{record}'),
            'edit' => EditVideo::route('/{record}/edit'),
        ];
    }
}
