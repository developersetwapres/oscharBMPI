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
    count?: number;
}

export interface KategoriLayanan {
    id: number;
    kode_kategori: string;
    nama_kategori: string;
    deskripsi: string;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
    flash: {
        success: string;
        JumlahMenunggu: number;
    };
}

export interface User {
    id: number;
    name: string;
    email: string;
    jabatan: string;
    role: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Layanan {
    id: number;
    user_id: number;
    user: User;
    kode_layanan: string;
    kategori_layanan_id: number;
    kategori: KategoriLayanan;
    status: string;
    detail: string;
    keterangan: string;
    created_at: string;
    updated_at: string;
}
