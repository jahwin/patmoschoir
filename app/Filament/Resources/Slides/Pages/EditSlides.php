<?php

namespace App\Filament\Resources\Slides\Pages;

use App\Filament\Resources\Slides\SlidesResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditSlides extends EditRecord
{
    protected static string $resource = SlidesResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
