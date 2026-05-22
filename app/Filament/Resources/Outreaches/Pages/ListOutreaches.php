<?php

namespace App\Filament\Resources\Outreaches\Pages;

use App\Filament\Resources\Outreaches\OutreachesResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListOutreaches extends ListRecords
{
    protected static string $resource = OutreachesResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
