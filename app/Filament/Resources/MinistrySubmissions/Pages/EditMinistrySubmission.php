<?php

namespace App\Filament\Resources\MinistrySubmissions\Pages;

use App\Filament\Resources\MinistrySubmissions\MinistrySubmissionResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditMinistrySubmission extends EditRecord
{
    protected static string $resource = MinistrySubmissionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
