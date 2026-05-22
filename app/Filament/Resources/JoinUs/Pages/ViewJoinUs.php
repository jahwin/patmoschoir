<?php

namespace App\Filament\Resources\JoinUs\Pages;

use App\Filament\Resources\JoinUs\JoinUsResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\ViewRecord;

class ViewJoinUs extends ViewRecord
{
    protected static string $resource = JoinUsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
