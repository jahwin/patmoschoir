import '../css/app.css';
import '../css/global.scss';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || '';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) => {
        // Handle index.tsx in subdirectories
        const pages = import.meta.glob('./pages/**/*.tsx');
        // Try the subdirectory path first
        const pagePath = `./pages/${name}/index.tsx`;
        return resolvePageComponent(pagePath, pages);
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: 'var(--color-theme-clr)',
    },
});


