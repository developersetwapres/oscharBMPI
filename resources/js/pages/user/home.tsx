'use client';

import { Card, CardContent } from '@/components/ui/card';
import { create } from '@/routes/layanan';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { AlertCircle, CheckCircle, Clock, FileText } from 'lucide-react';

export default function UserHomePage() {
    const { auth } = usePage<SharedData>().props;

    const requests = [
        {
            id: 2,
            kategori: 'Pengadaan Logistik',
            detail: 'Permintaan pembelian alat kantor',
            tanggal: '2024-10-28',
            status: 'Selesai',
            statusColor: 'bg-green-100 text-green-700',
            statusIcon: CheckCircle,
        },
        {
            id: 3,
            kategori: 'Kepegawaian',
            detail: 'Permohonan izin cuti tahunan',
            tanggal: '2024-10-15',
            status: 'Proses',
            statusColor: 'bg-blue-100 text-blue-700',
            statusIcon: Clock,
        },
        {
            id: 4,
            kategori: 'Persuratan',
            detail: 'Pengajuan surat rekomendasi',
            tanggal: '2024-10-05',
            status: 'Menunggu',
            statusColor: 'bg-yellow-100 text-yellow-700',
            statusIcon: AlertCircle,
        },
        {
            id: 5,
            kategori: 'Keuangan',
            detail: 'Laporan keuangan bulanan',
            tanggal: '2024-09-30',
            status: 'Selesai',
            statusColor: 'bg-green-100 text-green-700',
            statusIcon: CheckCircle,
        },
        {
            id: 6,
            kategori: 'Pengadaan Logistik',
            detail: 'Inventaris barang rutin',
            tanggal: '2024-09-20',
            status: 'Selesai',
            statusColor: 'bg-green-100 text-green-700',
            statusIcon: CheckCircle,
        },
    ];

    const categoryIcons: Record<string, string> = {
        Keuangan: '💰',
        'Pengadaan Logistik': '📦',
        Kepegawaian: '👥',
        Persuratan: '📄',
    };

    return (
        <div className="min-h-screen bg-gradient-to-tr from-white via-background to-blue-100">
            <div className="spacae-y-8 mx-auto max-w-3xl px-4 py-8 md:py-12">
                <div className="mb-12 text-center md:mb-16">
                    <div className="mb-6 flex justify-center">
                        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 shadow-lg md:h-20 md:w-20">
                            <img src="/image/logo.png" alt="" />{' '}
                        </div>
                    </div>

                    <h1 className="mb-3 text-3xl font-bold md:text-4xl">
                        Selamat Datang,
                        <br />
                    </h1>
                    <h1 className="mb-3 text-3xl font-bold md:text-4xl">
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            {auth.user.name}
                        </span>
                    </h1>

                    <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
                        Kelola permintaan layanan administrasi Anda dengan
                        mudah. Ajukan permintaan baru atau pantau status riwayat
                        layanan Anda.
                    </p>
                </div>

                {/* Quick Actions */}
                <div className="mb-12 grid gap-3 md:gap-4">
                    <Link href={create.url()}>
                        <Card className="h-full cursor-pointer transition-all hover:border-primary hover:shadow-lg">
                            <CardContent className="flex h-full flex-col items-center justify-center gap-3 p-4 text-center md:p-6">
                                <FileText className="h-8 w-8 text-primary md:h-10 md:w-10" />
                                <div>
                                    <p className="text-xl font-semibold">
                                        Ajukan Layanan
                                    </p>
                                    <p className="text-muted-foreground">
                                        Buat permintaan baru
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>

                {/* Header */}
                <div className="mb-8 text-center md:text-left">
                    <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                        Riwayat Permintaan Layanan
                    </h1>
                    <p className="max-w-2xl text-sm text-muted-foreground">
                        Pantau status semua permintaan layanan administrasi Anda
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="mb-8 grid grid-cols-3 gap-3 md:gap-4">
                    <Card className="gap-0 py-0">
                        <CardContent className="p-4 text-center md:p-6">
                            <p className="mb-1 text-xl font-bold text-primary md:text-2xl">
                                {requests.length}
                            </p>
                            <p className="text-xs text-muted-foreground md:text-sm">
                                Total
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="gap-0 py-0">
                        <CardContent className="p-4 text-center md:p-6">
                            <p className="mb-1 text-xl font-bold text-green-600 md:text-2xl">
                                {
                                    requests.filter(
                                        (r) => r.status === 'Selesai',
                                    ).length
                                }
                            </p>
                            <p className="text-xs text-muted-foreground md:text-sm">
                                Selesai
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="gap-0 py-0">
                        <CardContent className="p-4 text-center md:p-6">
                            <p className="mb-1 text-xl font-bold text-orange-600 md:text-2xl">
                                {
                                    requests.filter(
                                        (r) => r.status !== 'Selesai',
                                    ).length
                                }
                            </p>
                            <p className="text-xs text-muted-foreground md:text-sm">
                                Proses
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Requests List */}
                <div className="space-y-4 pb-8">
                    {requests.map((request) => {
                        const StatusIcon = request.statusIcon;
                        return (
                            <Card
                                key={request.id}
                                className="gap-0 py-4 transition-shadow hover:shadow-md"
                            >
                                <CardContent className="p-4 md:p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 text-2xl md:text-3xl">
                                            {categoryIcons[request.kategori] ||
                                                '📋'}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="mb-2 flex flex-row items-start justify-between gap-2">
                                                <div>
                                                    <h3 className="text-sm font-semibold text-foreground md:text-base">
                                                        {request.kategori}
                                                    </h3>
                                                    <p className="line-clamp-2 text-xs text-muted-foreground md:text-sm">
                                                        {request.detail}
                                                    </p>
                                                </div>
                                                <div
                                                    className={`flex flex-shrink-0 items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${request.statusColor}`}
                                                >
                                                    <StatusIcon className="h-3 w-3 md:h-4 md:w-4" />
                                                    {request.status}
                                                </div>
                                            </div>

                                            <p className="text-xs text-muted-foreground">
                                                {new Date(
                                                    request.tanggal,
                                                ).toLocaleDateString('id-ID', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
