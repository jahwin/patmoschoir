import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SocialLink {
    platform: string;
    url: string;
}

export interface Value {
    title: string;
    description: string;
    icon: string;
}

export interface SiteContent {
    id: number;
    site_logo: string | null;
    site_color: string | null;
    site_name: string | null;
    social_links: SocialLink[] | null;
    address: string | null;
    whatsapp_number: string | null;
    phones: string[] | null;
    emails: string[] | null;
    faqs: unknown[] | null;
    about_text: string | null;
    about_us: string | null;
    mission: string | null;
    vision: string | null;
    values: Value[] | null;
    terms_and_conditions: string | null;
    privacy_policy: string | null;
    keywords: string[] | null;
    description: string | null;
    payment_terms: string | null;
    about_image: string | null;
    footer_text: string | null;
    subimage: string | null;
    origin_domain: string | null;
    home_about_background_image: string | null;
    home_music_background_image: string | null;
    home_videos_background_image: string | null;
    home_news_background_image: string | null;
    created_at: string;
    updated_at: string;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    siteContent: SiteContent | null;
    metadata: {
        title: string;
        description: string;
        keywords: string;
        image: string;
        favicon: string;
    };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
