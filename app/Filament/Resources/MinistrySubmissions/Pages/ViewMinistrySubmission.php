<?php

namespace App\Filament\Resources\MinistrySubmissions\Pages;

use App\Filament\Resources\MinistrySubmissions\MinistrySubmissionResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewMinistrySubmission extends ViewRecord
{
    protected static string $resource = MinistrySubmissionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
