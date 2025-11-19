'use client';

import { FooterUser } from '@/components/oscar/footer-user';
import { Pagination } from '@/components/oscar/pagination';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Toaster } from '@/components/ui/toaster';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { useToast } from '@/hooks/use-toast';
import { logout } from '@/routes';
import { create } from '@/routes/layanan';
import { SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { FileText, Package, Users, Wallet } from 'lucide-react';

import { AlertCircle, CheckCircle, Clock, LogOut } from 'lucide-react';
import { JSX, useEffect, useMemo, useState } from 'react';

export default function UserHomePage({ requests }: any) {
    const { auth, flash } = usePage<SharedData>().props;

    const { toast } = useToast();

    useEffect(() => {
        if (flash.success) {
            toast({
                title: 'Berhasil',
                description: flash.success,
            });
        }
    }, [flash.success]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const statusMap: Record<string, { color: string; icon: any }> = {
        Selesai: {
            color: 'bg-green-100 text-green-700',
            icon: CheckCircle,
        },
        Proses: {
            color: 'bg-blue-100 text-blue-700',
            icon: Clock,
        },
        Menunggu: {
            color: 'bg-yellow-100 text-yellow-700',
            icon: AlertCircle,
        },
    };

    const cleanup = useMobileNavigation();

    const categoryIcons: Record<string, JSX.Element> = {
        Keuangan: <Wallet className="h-5 w-5 text-amber-500" />,
        'Pengadaan Logistik': <Package className="h-5 w-5 text-blue-500" />,
        Kepegawaian: <Users className="h-5 w-5 text-emerald-500" />,
        Persuratan: <FileText className="h-5 w-5 text-violet-500" />,
    };

    const paginatedData = useMemo(() => {
        const totalPages = Math.ceil(requests.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedRequests = requests.slice(startIndex, endIndex);

        return { paginatedRequests, totalPages };
    }, [requests, currentPage, itemsPerPage]);

    return (
        <>
            <Head title="HOME" />
            <div className="min-h-screen bg-gradient-to-tr from-white via-background to-blue-100">
                <div className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
                    <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100">
                                <img
                                    src="/image/logo.png"
                                    alt="Logo"
                                    className="h-full w-full"
                                />
                            </div>
                            <h2 className="text-sm font-semibold text-foreground md:text-base">
                                Oscar BPMI
                            </h2>
                        </div>

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Log out
                                </Button>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Konfirmasi Logout
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Apakah Anda yakin ingin keluar dari akun
                                        Anda?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>

                                <div className="flex gap-3">
                                    <AlertDialogCancel>Batal</AlertDialogCancel>

                                    <AlertDialogAction
                                        onClick={() => {
                                            cleanup();
                                            router.visit(logout(), {
                                                method: 'post',
                                            });
                                        }}
                                        className="bg-red-600 hover:bg-red-700"
                                    >
                                        Logout
                                    </AlertDialogAction>
                                </div>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>

                <div className="spacae-y-8 md:py-12X mx-auto max-w-3xl px-4 py-8">
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
                            mudah. Ajukan permintaan baru atau pantau status
                            riwayat layanan Anda.
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
                            Pantau status semua permintaan layanan administrasi
                            Anda
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="mb-8 grid grid-cols-4 gap-2 md:gap-4">
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
                                <p className="mb-1 text-xl font-bold text-orange-600 md:text-2xl">
                                    {
                                        requests.filter(
                                            (r: any) => r.status == 'Menunggu',
                                        ).length
                                    }
                                </p>
                                <p className="text-xs text-muted-foreground md:text-sm">
                                    Menunggu
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="gap-0 py-0">
                            <CardContent className="p-4 text-center md:p-6">
                                <p className="mb-1 text-xl font-bold text-orange-600 md:text-2xl">
                                    {
                                        requests.filter(
                                            (r: any) => r.status == 'Proses',
                                        ).length
                                    }
                                </p>
                                <p className="text-xs text-muted-foreground md:text-sm">
                                    Proses
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="gap-0 py-0">
                            <CardContent className="p-4 text-center md:p-6">
                                <p className="mb-1 text-xl font-bold text-green-600 md:text-2xl">
                                    {
                                        requests.filter(
                                            (r: any) => r.status == 'Selesai',
                                        ).length
                                    }
                                </p>
                                <p className="text-xs text-muted-foreground md:text-sm">
                                    Selesai
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Requests List */}
                    <div className="space-y-4 pb-8">
                        {paginatedData.paginatedRequests.map((request: any) => {
                            const s =
                                statusMap[request.status] ||
                                statusMap['Menunggu']; // fallback
                            const StatusIcon = s.icon;

                            return (
                                <Card
                                    key={request.id}
                                    className="gap-0 py-4 transition-shadow hover:shadow-md"
                                >
                                    <CardContent className="p-4 md:p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 text-2xl md:text-3xl">
                                                {categoryIcons[
                                                    request?.kategori
                                                        ?.nama_kategori
                                                ] || '📋'}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="mb-2 flex flex-row items-start justify-between gap-2">
                                                    <div>
                                                        <h3 className="text-sm font-semibold text-foreground md:text-base">
                                                            {
                                                                request
                                                                    ?.kategori
                                                                    ?.nama_kategori
                                                            }
                                                        </h3>
                                                        <p className="line-clamp-2 text-xs text-muted-foreground md:text-sm">
                                                            {request.detail}
                                                        </p>
                                                    </div>
                                                    <div
                                                        className={`flex flex-shrink-0 items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${s.color}`}
                                                    >
                                                        <StatusIcon className="h-3 w-3 md:h-4 md:w-4" />
                                                        {request.status}
                                                    </div>
                                                </div>

                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(
                                                        request.created_at,
                                                    ).toLocaleDateString(
                                                        'id-ID',
                                                        {
                                                            weekday: 'long',
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                        },
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>

                    {requests.length > 0 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={paginatedData.totalPages}
                            onPageChange={setCurrentPage}
                            totalItems={requests.length}
                            itemsPerPage={itemsPerPage}
                        />
                    )}
                </div>
            </div>
            <FooterUser />

            <Toaster />
        </>
    );
}
