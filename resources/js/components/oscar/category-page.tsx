'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { destroy, status } from '@/routes/layanan';
import { router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Service {
    id: number;
    nama: string;
    jabatan: string;
    tanggal: string;
    kategori: string;
    detail: string;
    status: string;
}

export function CategoryPage({ initialData }: any) {
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    const stats = {
        proses: initialData.filter((s: any) => s.status === 'Proses').length,
        selesai: initialData.filter((s: any) => s.status === 'Selesai').length,
        menunggu: initialData.filter((s: any) => s.status === 'Menunggu')
            .length,
    };

    const handleStatusChange = (kodeLayanan: string, newStatus: string) => {
        router.put(
            status.url(kodeLayanan),
            { status: newStatus },
            {
                onSuccess: () => {
                    //
                },
                onError: (errors) => {
                    console.error('Error updating status:', errors);
                },
            },
        );
    };

    const handleDelete = (kodeLayanan: string) => {
        router.delete(destroy.url(kodeLayanan), {
            onSuccess: () => {
                //
            },
            onError: (errors) => {
                console.error('Error updating status:', errors);
            },
        });
    };

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'Proses':
                return 'bg-blue-100 text-blue-800 border-blue-300';
            case 'Selesai':
                return 'bg-green-100 text-green-800 border-green-300';
            case 'Menunggu':
                return 'bg-purple-100 text-purple-800 border-purple-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    return (
        <div>
            <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Proses</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-primary">
                            {stats.proses}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Selesai</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-accent">
                            {stats.selesai}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Menunggu</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-yellow-600">
                            {stats.menunggu}
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Daftar Layanan</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="px-4 py-3 text-left font-semibold text-foreground">
                                        Tanggal
                                    </th>
                                    <th className="px-4 py-3 text-left font-semibold text-foreground">
                                        Nama
                                    </th>
                                    <th className="px-4 py-3 text-left font-semibold text-foreground">
                                        Jabatan
                                    </th>
                                    <th className="px-4 py-3 text-left font-semibold text-foreground">
                                        Detail
                                    </th>
                                    <th className="px-4 py-3 text-left font-semibold text-foreground">
                                        Status
                                    </th>
                                    <th className="px-4 py-3 text-left font-semibold text-foreground">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {initialData.map((service: any) => (
                                    <tr
                                        key={service.id}
                                        className="border-borderhover:bg-muted/50 border-b"
                                    >
                                        <td className="px-4 py-3 text-nowrap text-foreground">
                                            {new Date(
                                                service.created_at,
                                            ).toLocaleDateString('id-ID', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </td>
                                        <td className="px-4 py-3 text-nowrap text-foreground">
                                            {service.user?.name}
                                        </td>
                                        <td className="px-4 py-3 text-nowrap text-foreground">
                                            {service.user?.jabatan}
                                        </td>
                                        <td className="max-w-xs truncate px-4 py-3 text-foreground">
                                            {service.detail}
                                        </td>
                                        <td className="px-4 py-3">
                                            <select
                                                value={service.status}
                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        service.kode_layanan,
                                                        e.target.value,
                                                    )
                                                }
                                                className={`cursor-pointer rounded-full border px-3 py-1 text-xs font-medium transition-colors ${getStatusStyles(service.status)}`}
                                            >
                                                <option value="Proses">
                                                    Proses
                                                </option>
                                                <option value="Selesai">
                                                    Selesai
                                                </option>
                                                <option value="Menunggu">
                                                    Menunggu
                                                </option>
                                            </select>
                                        </td>
                                        <td className="px-4 py-3">
                                            <button
                                                onClick={() =>
                                                    setDeleteConfirm(
                                                        service.kode_layanan,
                                                    )
                                                }
                                                className="flex items-center gap-1 text-xs font-medium text-red-600 hover:text-red-800"
                                            >
                                                <Trash2 className="h-3 w-3" />
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            <AlertDialog
                open={deleteConfirm !== null}
                onOpenChange={(open) => !open && setDeleteConfirm(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Layanan</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus layanan ini?
                            Tindakan ini tidak dapat dibatalkan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="mt-4 flex justify-end gap-3">
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() =>
                                deleteConfirm !== null &&
                                handleDelete(deleteConfirm)
                            }
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Hapus
                        </AlertDialogAction>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
