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
        $siteContent = SiteContent::first();

        if (!$siteContent) {
            $siteContent = SiteContent::create([]);
        }

        $this->redirect(EditSiteContents::getUrl(['record' => $siteContent->id]));
    }
}
