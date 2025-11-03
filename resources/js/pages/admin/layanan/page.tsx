'use client';

import { CategoryPage } from '@/components/oscar/category-page';

import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

interface initialProps {
    services: any[];
    judul: string;
}

export default function Dashboard({ services, judul }: initialProps) {
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
                <CategoryPage initialData={services} />
            </div>
        </AppLayout>
    );
}
