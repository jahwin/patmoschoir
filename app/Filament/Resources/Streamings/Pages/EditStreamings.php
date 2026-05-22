<?php

namespace App\Filament\Resources\Streamings\Pages;

use App\Filament\Resources\Streamings\StreamingsResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditStreamings extends EditRecord
{
    protected static string $resource = StreamingsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
