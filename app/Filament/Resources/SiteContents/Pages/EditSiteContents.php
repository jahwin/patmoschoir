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
        // Ensure we're always editing the first (and only) record
        $siteContent = SiteContent::first();

        if (!$siteContent) {
            $siteContent = SiteContent::create([]);
        }

        // If a different record ID was passed, redirect to the correct one
        if ($record != $siteContent->id) {
            $this->redirect(static::getUrl(['record' => $siteContent->id]));
            return;
        }

        parent::mount($record);
    }

    protected function getHeaderActions(): array
    {
        return [
            // Remove delete and view actions since this is a settings page
        ];
    }

    public function getTitle(): string | Htmlable
    {
        return 'Site Settings';
    }
}
