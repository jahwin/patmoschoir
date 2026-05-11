<?php

namespace App\Filament\Resources\SiteContents\Pages;

use App\Filament\Resources\SiteContents\SiteContentsResource;
use App\Models\SiteContent;
use Filament\Resources\Pages\Page;

class ManageSiteContents extends Page
{
    protected static string $resource = SiteContentsResource::class;

    protected static ?string $title = 'Site Settings';

    protected string $view = 'filament.resources.site-contents.pages.manage-site-contents';

    public function mount(): void
    {
        // Get the first site content record, or create one if none exists
        $siteContent = SiteContent::first();

        if (!$siteContent) {
            $siteContent = SiteContent::create([]);
        }

        // Redirect to the edit page of the first record
        $this->redirect(EditSiteContents::getUrl(['record' => $siteContent->id]));
    }
}
