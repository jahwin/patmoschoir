<?php

namespace App\Filament\Resources\Music\Pages;

use App\Filament\Resources\Music\MusicResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewMusic extends ViewRecord
{
    protected static string $resource = MusicResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
