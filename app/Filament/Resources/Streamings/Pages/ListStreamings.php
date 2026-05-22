<?php

namespace App\Filament\Resources\Streamings\Pages;

use App\Filament\Resources\Streamings\StreamingsResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListStreamings extends ListRecords
{
    protected static string $resource = StreamingsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
