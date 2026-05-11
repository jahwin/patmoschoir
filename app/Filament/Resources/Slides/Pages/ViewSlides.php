<?php

namespace App\Filament\Resources\Slides\Pages;

use App\Filament\Resources\Slides\SlidesResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewSlides extends ViewRecord
{
    protected static string $resource = SlidesResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
