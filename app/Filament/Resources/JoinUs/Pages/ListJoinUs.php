<?php

namespace App\Filament\Resources\JoinUs\Pages;

use App\Filament\Resources\JoinUs\JoinUsResource;
use Filament\Resources\Pages\ListRecords;

class ListJoinUs extends ListRecords
{
    protected static string $resource = JoinUsResource::class;

    protected function getHeaderActions(): array
    {
        return [];
    }
}
