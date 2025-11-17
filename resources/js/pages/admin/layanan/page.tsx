'use client';

import { CategoryPage } from '@/components/oscar/category-page';

import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { Layanan, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

interface initialProps {
    layanan: Layanan[];
    judul: string;
    jumlahLayanan: number;
    JumlahProses: number;
    JumlahMenunggu: number;
    JumlahSelesai: number;
}

export default function Dashboard({
    layanan,
    judul,
    jumlahLayanan,
    JumlahProses,
    JumlahMenunggu,
    JumlahSelesai,
}: initialProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: judul,
            href: dashboard().url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={judul} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <CategoryPage
                    layanan={layanan}
                    jumlahLayanan={jumlahLayanan}
                    JumlahProses={JumlahProses}
                    JumlahMenunggu={JumlahMenunggu}
                    JumlahSelesai={JumlahSelesai}
                />
            </div>
        </AppLayout>
    );
}
