import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import ReactDOMServer from 'react-dom/server';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => (title ? `${title} - ${appName}` : appName),
        resolve: (name) => {
            // Handle index.tsx in subdirectories
            const pagePath = `./pages/${name}/index.tsx`;
            return resolvePageComponent(
                pagePath,
                import.meta.glob('./pages/**/*.tsx'),
            );
        },
        setup: ({ App, props }) => {
            return <App {...props} />;
        },
    }),
);
