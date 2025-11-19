import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { index as indexlayanan } from '@/routes/layanan';
import { index as indexUser } from '@/routes/user';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { FileText, LayoutGrid, Package, Users, Wallet } from 'lucide-react';
import AppLogo from './app-logo';

const footerNavItems: NavItem[] = [
    {
        title: 'Manajemen User',
        href: indexUser.url(),
        icon: Users,
        count: 0,
    },
    // {
    //     title: 'Documentation',
    //     href: 'https://laravel.com/docs/starter-kits#react',
    //     icon: BookOpen,
    // },
];

export function AppSidebar() {
    const { layananCategories } = usePage<{ layananCategories: any[] }>().props;

    // 🔹 Mapping nama kategori → ikon lucide
    const categoryIcons: Record<string, any> = {
        Keuangan: Wallet,
        'Pengadaan Logistik': Package,
        Kepegawaian: Users,
        Persuratan: FileText,
    };

    // 🔹 Item utama statis
    const navItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        },
    ];

    // 🔹 Gabungkan kategori dari backend
    const layananItems: NavItem[] =
        layananCategories?.map((kategori) => ({
            title: kategori.nama_kategori,
            href: indexlayanan(kategori.kode_kategori),
            icon: categoryIcons[kategori.nama_kategori] ?? LayoutGrid,
            count: kategori.jumlah,
        })) ?? [];

    // 🔹 Gabungkan semuanya
    const mainNavItems: NavItem[] = [...navItems, ...layananItems];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
