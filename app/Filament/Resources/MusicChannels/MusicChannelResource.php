<?php

namespace App\Filament\Resources\MusicChannels;

use App\Filament\Resources\MusicChannels\Pages\CreateMusicChannel;
use App\Filament\Resources\MusicChannels\Pages\EditMusicChannel;
use App\Filament\Resources\MusicChannels\Pages\ListMusicChannels;
use App\Filament\Resources\MusicChannels\Schemas\MusicChannelForm;
use App\Filament\Resources\MusicChannels\Tables\MusicChannelsTable;
use App\Models\MusicChannel;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class MusicChannelResource extends Resource
{
    protected static ?string $model = MusicChannel::class;

    protected static string|BackedEnum|null $navigationIcon = 'lucide-music-2';

    protected static UnitEnum|string|null $navigationGroup = 'Media';

    protected static ?int $navigationSort = 3;

    public static function form(Schema $schema): Schema
    {
        return MusicChannelForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return MusicChannelsTable::configure($table);
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
            'index' => ListMusicChannels::route('/'),
            'create' => CreateMusicChannel::route('/create'),
            'edit' => EditMusicChannel::route('/{record}/edit'),
        ];
    }
}
