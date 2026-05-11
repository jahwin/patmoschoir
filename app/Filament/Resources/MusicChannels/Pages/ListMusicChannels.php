<?php

namespace App\Filament\Resources\MusicChannels\Pages;

use App\Filament\Resources\MusicChannels\MusicChannelResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListMusicChannels extends ListRecords
{
    protected static string $resource = MusicChannelResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
