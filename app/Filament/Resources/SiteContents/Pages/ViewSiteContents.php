<?php

namespace App\Filament\Resources\SiteContents\Pages;

use App\Filament\Resources\SiteContents\SiteContentsResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewSiteContents extends ViewRecord
{
    protected static string $resource = SiteContentsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
        ];
    }
}