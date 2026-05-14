<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        @php
            // Metadata
            $metadata = $page['props']['metadata'] ?? [];
            $title = $metadata['title'] ?? config('app.name', 'Kalisimbi Events');
            $description = $metadata['description'] ?? '';
            $keywords = $metadata['keywords'] ?? '';
            $image = $metadata['image'] ?? '';
            $favicon = $metadata['favicon'] ?? '';
            $url = $metadata['url'] ?? url()->current();
            $type = $metadata['type'] ?? 'website';
            
            $imageUrl = null;
            $faviconUrl = null;

            if ($image) {
                $imageUrl = $image;
            }

            if ($favicon) {
                $faviconUrl = $favicon;
            }

            // $imageUrl = $image ? (str_starts_with($image, 'http') ? $image : asset($image)) : '/favicon.ico';
            // $faviconUrl = $favicon ? (str_starts_with($favicon, 'http') ? $favicon : asset($favicon)) : '/favicon.ico';

            // Custom Metadata
            $customMetadata = $page['props']['customMetadata'] ?? [];
            $customTitle = $customMetadata['title'] ?? null;
            $customDescription = $customMetadata['description'] ?? null;
            $customKeywords = $customMetadata['keywords'] ?? null;
            $customImage = $customMetadata['image'] ?? null;
            $customFavicon = $customMetadata['favicon'] ?? null;
            $customUrl = $customMetadata['url'] ?? null;
            $customType = $customMetadata['type'] ?? 'website';

            $customImageUrl = null;
            $customFaviconUrl = null;

            if ($customImage) {
                $customImageUrl = $customImage;
            }

            if ($customFavicon) {
                $customFaviconUrl = $customFavicon;
            }

            // $customImageUrl = $customImage ? (str_starts_with($customImage, 'http') ? $customImage : asset($customImage)) : '/favicon.ico';
            // $customFaviconUrl = $customFavicon ? (str_starts_with($customFavicon, 'http') ? $customFavicon : asset($customFavicon)) : '/favicon.ico';
        @endphp

        <title inertia>{{ $customTitle ?? $title }}</title>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        <!-- HTML Meta Tags -->
        <meta name="description" content="{{ $customDescription ?? $description }}" />
        <link rel="canonical" href="{{ $customUrl ?? $url }}" />
        <link rel="icon" type="image/png" href="{{ $faviconUrl }}" />
        @if($keywords)
            <meta name="keywords" content="{{ $customKeywords ?? $keywords }}" />
        @endif

        <!-- Google / Search Engine Tags -->
        <meta itemprop="name" content="{{ $customTitle ?? $title }}" />
        <meta itemprop="description" content="{{ $customDescription ?? $description }}" />
        @if($image)
            <meta itemprop="image" content="{{ $customImageUrl ?? $imageUrl }}" />
        @endif

        <!-- Facebook Meta Tags -->
        <meta property="og:url" content="{{ $url }}" />
        <meta property="og:type" content="{{ $type }}" />
        <meta property="og:title" content="{{ $customTitle ?? $title }}" />
        <meta property="og:description" content="{{ $customDescription ?? $description }}" />
        @if($image)
            <meta property="og:image" content="{{ $customImageUrl ?? $imageUrl }}" />
        @endif

        <!-- Twitter Meta Tags -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="{{ $title }}" />
        <meta name="twitter:description" content="{{ $description }}" />
        @if($image)
            <meta name="twitter:image" content="{{ $customImageUrl ?? $imageUrl }}" />
        @endif

        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        {{-- <link href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"> --}}
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&family=Caveat:wght@500;600;700&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,1..1000&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
        @viteReactRefresh
        @vite(['resources/js/app.tsx'])
        @inertiaHead

        @if ($page['props']['siteContent'] && $page['props']['siteContent']['site_color'])
            <style>
                :root {
                    --color-theme-clr: {{ $page['props']['siteContent']['site_color'] }};
                }
            </style>
        @endif
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
