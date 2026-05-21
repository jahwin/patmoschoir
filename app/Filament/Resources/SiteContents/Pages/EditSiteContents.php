<?php

namespace App\Filament\Resources\SiteContents\Pages;

use App\Filament\Resources\SiteContents\SiteContentsResource;
use App\Models\SiteContent;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Contracts\Support\Htmlable;

class EditSiteContents extends EditRecord
{
    protected static string $resource = SiteContentsResource::class;

    protected static ?string $title = 'Site Settings';

    public function mount(int | string $record): void
    {
        $siteContent = SiteContent::first();

        if (!$siteContent) {
            $siteContent = SiteContent::create([]);
        }

        if ($record != $siteContent->id) {
            $this->redirect(static::getUrl(['record' => $siteContent->id]));
            return;
        }

        parent::mount($record);
    }

    protected function getHeaderActions(): array
    {
        return [];
    }

    public function getTitle(): string | Htmlable
    {
        return 'Site Settings';
    }
}
