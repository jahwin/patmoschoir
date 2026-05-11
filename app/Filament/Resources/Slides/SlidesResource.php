<?php

namespace App\Filament\Resources\Slides;

use App\Filament\Resources\Slides\Pages\CreateSlides;
use App\Filament\Resources\Slides\Pages\EditSlides;
use App\Filament\Resources\Slides\Pages\ListSlides;
use App\Filament\Resources\Slides\Pages\ViewSlides;
use App\Filament\Resources\Slides\Schemas\SlidesForm;
use App\Filament\Resources\Slides\Schemas\SlidesInfolist;
use App\Filament\Resources\Slides\Tables\SlidesTable;
use App\Models\Slides;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class SlidesResource extends Resource
{
    protected static ?string $model = Slides::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'title';

    protected static UnitEnum|string|null $navigationGroup = 'Content Management';

    protected static ?int $navigationSort = 4;

    public static function form(Schema $schema): Schema
    {
        return SlidesForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return SlidesInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return SlidesTable::configure($table);
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
            'index' => ListSlides::route('/'),
            'create' => CreateSlides::route('/create'),
            'view' => ViewSlides::route('/{record}'),
            'edit' => EditSlides::route('/{record}/edit'),
        ];
    }
}
