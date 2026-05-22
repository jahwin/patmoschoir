<?php

namespace App\Filament\Resources\Outreaches\Pages;

use App\Filament\Resources\Outreaches\OutreachesResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditOutreaches extends EditRecord
{
    protected static string $resource = OutreachesResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
