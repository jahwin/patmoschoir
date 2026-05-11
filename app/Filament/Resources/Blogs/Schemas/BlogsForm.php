<?php

namespace App\Filament\Resources\Blogs\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class BlogsForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required()
                    ->maxLength(255)
                    ->placeholder('Enter blog title...')
                    ->columnSpanFull(),

                TextInput::make('author')
                    ->label('Author')
                    ->maxLength(100)
                    ->placeholder('Enter author name...')
                    ->columnSpanFull(),
                
                // FileUpload::make('image')
                //     ->image()
                //     ->imageEditor()
                //     ->imageEditorAspectRatios([
                //         '16:9',
                //         '4:3',
                //         '1:1',
                //     ])
                //     ->imageCropAspectRatio('16:9')
                //     ->imageResizeTargetWidth('1920')
                //     ->imageResizeTargetHeight('1080')
                //     ->directory('blogs')
                //     ->visibility('public')
                //     ->columnSpanFull(),

                FileUpload::make('image')
                    ->label('Blog Cover Image')
                    ->image()
                    ->placeholder('Upload blog cover image')
                    ->imageEditor()
                    ->imageEditorMode(2)
                    ->imageEditorAspectRatios([
                        null,
                        '16:9',
                        '4:3',
                        '1:1',
                    ])
                    ->required()
                    ->placeholder('Upload blog cover image...')
                    ->maxSize(2048)
                    ->directory('blogs/covers')
                    ->visibility('public')
                    ->columnSpanFull(),

                
                RichEditor::make('content')
                    ->required()
                    ->placeholder('Enter blog content...')
                    ->columnSpanFull()
                    ->toolbarButtons([
                        'attachFiles',
                        'blockquote',
                        'bold',
                        'bulletList',
                        'codeBlock',
                        'h2',
                        'h3',
                        'italic',
                        'link',
                        'orderedList',
                        'redo',
                        'strike',
                        'underline',
                        'undo',
                    ]),
                
                TagsInput::make('tags')
                    ->placeholder('Enter tags...')
                    ->separator(',')
                    ->columnSpanFull(),
            ]);
    }
}
