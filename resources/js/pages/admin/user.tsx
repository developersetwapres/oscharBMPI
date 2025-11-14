'use client';

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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Trash2, Users } from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { verify } from '@/routes/user';
import { BreadcrumbItem, User } from '@/types';
import { Head, router } from '@inertiajs/react';
import { CheckCircle2, MoreVertical, Shield, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface inialProps {
    initialUsers: User[];
    belumTerverifikasi: number;
    terverifikasi: number;
    jumlahUser: number;
}

export default function UserManagement({
    initialUsers,
    belumTerverifikasi,
    terverifikasi,
    jumlahUser,
}: inialProps) {
    const [users, setUsers] = useState<User[]>(initialUsers);

    const handleVerify = (userId: number) => {
        router.put(
            verify.url(userId),
            {
                verification: true,
            },
            {
                onSuccess: () => {
                    console.log('ok');
                },
            },
        );
    };

    const handleCancelVerification = (userId: number) => {
        router.put(
            verify.url(userId),
            {
                verification: false,
            },
            {
                onSuccess: () => {
                    console.log('ok');
                },
            },
        );
    };

    const handleDelete = (userId: number) => {
        setUsers(users.filter((user) => user.id !== userId));
        console.log(`[v0] User ${userId} deleted`);
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Manajemen User',
            href: dashboard().url,
        },
    ];

    useEffect(() => {
        setUsers(initialUsers);
    }, [initialUsers]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={'User Aplikasi'} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex-1 overflow-auto">
                    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                        <Card className="border-l-4 border-l-cyan-500 bg-gradient-to-br from-cyan-50 to-white">
                            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-slate-600">
                                    Jumlah User
                                </CardTitle>
                                <Calendar className="size-5 text-cyan-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-cyan-600">
                                    {jumlahUser}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-white">
                            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-slate-600">
                                    User Terverifikasi
                                </CardTitle>
                                <Users className="size-5 text-purple-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-purple-600">
                                    {terverifikasi}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-l-4 border-l-rose-500 bg-gradient-to-br from-rose-50 to-white">
                            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-slate-600">
                                    User Belum Terverifikasi
                                </CardTitle>
                                <Clock className="size-5 text-rose-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-rose-600">
                                    {belumTerverifikasi}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    {/* Users Table */}
                    <div className="overflow-hidden rounded-lg border border-border bg-card">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-border bg-muted">
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                                            Nama
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                                            Email
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                                            Jabatan
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                                            Role
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                                            Status Verifikasi
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="border-b border-border transition-colors hover:bg-muted/50"
                                        >
                                            <td className="px-6 py-4 text-sm font-medium text-foreground">
                                                {user.name}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-muted-foreground">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-muted-foreground">
                                                {user.jabatan}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <span
                                                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                                                        user.role ===
                                                        'administrator'
                                                            ? 'bg-blue-100 text-blue-700'
                                                            : 'bg-gray-100 text-gray-700'
                                                    }`}
                                                >
                                                    {user.role ===
                                                        'administrator' && (
                                                        <Shield className="h-3 w-3" />
                                                    )}
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                {user.email_verified_at ? (
                                                    <div className="flex items-center gap-2">
                                                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                                                        <span className="font-medium text-green-600">
                                                            Verified
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="h-4 w-4 text-orange-600" />
                                                        <span className="font-medium text-orange-600">
                                                            Unverified
                                                        </span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        asChild
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 w-8 p-0 hover:bg-muted"
                                                        >
                                                            <MoreVertical className="h-4 w-4 text-muted-foreground" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent
                                                        align="end"
                                                        className="w-48"
                                                    >
                                                        {!user.email_verified_at ? (
                                                            <>
                                                                <DropdownMenuItem
                                                                    onClick={() =>
                                                                        handleVerify(
                                                                            user.id,
                                                                        )
                                                                    }
                                                                    className="cursor-pointer text-green-600"
                                                                >
                                                                    <CheckCircle2 className="mr-2 h-4 w-4" />
                                                                    Verifikasi
                                                                    Email
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                            </>
                                                        ) : (
                                                            <>
                                                                <DropdownMenuItem
                                                                    onClick={() =>
                                                                        handleCancelVerification(
                                                                            user.id,
                                                                        )
                                                                    }
                                                                    className="cursor-pointer text-orange-600"
                                                                >
                                                                    <XCircle className="mr-2 h-4 w-4" />
                                                                    Batalkan
                                                                    Verifikasi
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                            </>
                                                        )}
                                                        <AlertDialog>
                                                            <AlertDialogTrigger
                                                                asChild
                                                            >
                                                                <div className="flex cursor-pointer items-center rounded px-2 py-1.5 text-sm text-red-600 hover:bg-red-50">
                                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                                    Hapus User
                                                                </div>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>
                                                                        Hapus
                                                                        User
                                                                    </AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        Apakah
                                                                        Anda
                                                                        yakin
                                                                        ingin
                                                                        menghapus
                                                                        user{' '}
                                                                        <strong>
                                                                            {
                                                                                user.name
                                                                            }
                                                                        </strong>
                                                                        ?
                                                                        Tindakan
                                                                        ini
                                                                        tidak
                                                                        dapat
                                                                        dibatalkan.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogAction
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            user.id,
                                                                        )
                                                                    }
                                                                    className="bg-red-600 hover:bg-red-700"
                                                                >
                                                                    Hapus
                                                                </AlertDialogAction>
                                                                <AlertDialogCancel>
                                                                    Batal
                                                                </AlertDialogCancel>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
