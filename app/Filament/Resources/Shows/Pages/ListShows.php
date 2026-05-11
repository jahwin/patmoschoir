<?php

namespace App\Filament\Resources\Shows\Pages;

use App\Filament\Resources\Shows\ShowsResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListShows extends ListRecords
{
    protected static string $resource = ShowsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
