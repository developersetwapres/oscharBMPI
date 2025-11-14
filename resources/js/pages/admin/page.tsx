'use client';

import { DashboardPage } from '@/components/oscar/dashboard-page';

import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { KategoriLayanan, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({
    JumlahProses,
    JumlahMenunggu,
    JumlahSelesai,
    serviceCategoryData,
    JumlahAdmin,
    JumlahUser,
}: {
    JumlahProses: number;
    JumlahMenunggu: number;
    JumlahSelesai: number;
    JumlahAdmin: number;
    JumlahUser: number;
    serviceCategoryData: KategoriLayanan[];
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <DashboardPage
                    JumlahProses={JumlahProses}
                    JumlahMenunggu={JumlahMenunggu}
                    JumlahSelesai={JumlahSelesai}
                    serviceCategoryData={serviceCategoryData}
                    JumlahUser={JumlahUser}
                    JumlahAdmin={JumlahAdmin}
                />
            </div>
        </AppLayout>
    );
}
