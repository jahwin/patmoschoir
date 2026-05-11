<?php

namespace App\Filament\Resources\MinistrySubmissions\Pages;

use App\Filament\Resources\MinistrySubmissions\MinistrySubmissionResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListMinistrySubmissions extends ListRecords
{
    protected static string $resource = MinistrySubmissionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            //
        ];
    }
}
