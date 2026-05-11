<?php

namespace App\Filament\Resources\MusicChannels\Pages;

use App\Filament\Resources\MusicChannels\MusicChannelResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditMusicChannel extends EditRecord
{
    protected static string $resource = MusicChannelResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
