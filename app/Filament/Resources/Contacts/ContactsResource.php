<?php

namespace App\Filament\Resources\Contacts;

use App\Filament\Resources\Contacts\Pages\CreateContacts;
use App\Filament\Resources\Contacts\Pages\EditContacts;
use App\Filament\Resources\Contacts\Pages\ListContacts;
use App\Filament\Resources\Contacts\Pages\ViewContacts;
use App\Filament\Resources\Contacts\Schemas\ContactsForm;
use App\Filament\Resources\Contacts\Schemas\ContactsInfolist;
use App\Filament\Resources\Contacts\Tables\ContactsTable;
use App\Models\Contacts;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class ContactsResource extends Resource
{
    protected static ?string $model = Contacts::class;
    protected static string|BackedEnum|null $navigationIcon = 'lucide-mail';

    protected static ?string $recordTitleAttribute = 'name';

    protected static UnitEnum|string|null $navigationGroup = 'Submissions';

    protected static ?int $navigationSort = 1;

    public static function shouldRegisterNavigation(): bool
    {
        return false;
    }

    public static function form(Schema $schema): Schema
    {
        return ContactsForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return ContactsInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ContactsTable::configure($table);
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
            'index' => ListContacts::route('/'),
            'view' => ViewContacts::route('/{record}'),
        ];
    }
}
