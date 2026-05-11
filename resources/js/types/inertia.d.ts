import { SharedData } from './shared';

declare module '@inertiajs/react' {
    interface PageProps extends SharedData {}
}
