<?php

namespace App\Filament\Resources\Blogs\Pages;

use App\Filament\Resources\Blogs\BlogsResource;
use Filament\Resources\Pages\CreateRecord;

class CreateBlogs extends CreateRecord
{
    protected static string $resource = BlogsResource::class;
}
