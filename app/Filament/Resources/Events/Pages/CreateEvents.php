<?php

namespace App\Filament\Resources\Events\Pages;

use App\Filament\Resources\Events\EventsResource;
use Filament\Resources\Pages\CreateRecord;

class CreateEvents extends CreateRecord
{
    protected static string $resource = EventsResource::class;
}
