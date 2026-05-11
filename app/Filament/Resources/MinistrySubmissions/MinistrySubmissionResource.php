<?php

namespace App\Filament\Resources\MinistrySubmissions;

use App\Filament\Resources\MinistrySubmissions\Pages\CreateMinistrySubmission;
use App\Filament\Resources\MinistrySubmissions\Pages\EditMinistrySubmission;
use App\Filament\Resources\MinistrySubmissions\Pages\ListMinistrySubmissions;
use App\Filament\Resources\MinistrySubmissions\Pages\ViewMinistrySubmission;
use App\Filament\Resources\MinistrySubmissions\Schemas\MinistrySubmissionForm;
use App\Filament\Resources\MinistrySubmissions\Schemas\MinistrySubmissionInfolist;
use App\Filament\Resources\MinistrySubmissions\Tables\MinistrySubmissionsTable;
use App\Models\MinistrySubmission;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class MinistrySubmissionResource extends Resource
{
    protected static ?string $model = MinistrySubmission::class;

    protected static string|BackedEnum|null $navigationIcon = 'lucide-users';

    protected static ?string $recordTitleAttribute = 'full_name';

    protected static UnitEnum|string|null $navigationGroup = 'Submissions';

    protected static ?int $navigationSort = 2;

    public static function form(Schema $schema): Schema
    {
        return MinistrySubmissionForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return MinistrySubmissionInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return MinistrySubmissionsTable::configure($table);
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
            'index' => ListMinistrySubmissions::route('/'),
            'view' => ViewMinistrySubmission::route('/{record}'),
        ];
    }
}
