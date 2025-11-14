'use client';

import { SearchFilterBar } from '@/components/oscar/search-filter-bar';
import { TablePagination } from '@/components/oscar/table-pagination';
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
import { Layanan } from '@/types';
import { router } from '@inertiajs/react';
import { Calendar, Clock, Trash2, Users } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

interface initialProps {
    layanan: Layanan[];
    jumlahLayanan: number;
    JumlahProses: number;
    JumlahMenunggu: number;
    JumlahSelesai: number;
}

export function CategoryPage({
    layanan,
    jumlahLayanan,
    JumlahProses,
    JumlahMenunggu,
    JumlahSelesai,
}: initialProps) {
    useEffect(() => {
        setData(layanan);
    }, [layanan]);

    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [data, setData] = useState<Layanan[]>(layanan);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

    const filteredData = useMemo(() => {
        return data.filter((service) => {
            const matchesSearch =
                searchQuery.toLowerCase() === '' ||
                service.user?.name
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                service.kode_layanan
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                service.detail
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());

            const matchesStatus =
                selectedStatus === null || service.status === selectedStatus;

            return matchesSearch && matchesStatus;
        });
    }, [data, searchQuery, selectedStatus]);

    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filteredData.slice(startIndex, endIndex);

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

    const handlePageSizeChange = (newSize: number) => {
        setPageSize(newSize);
        setCurrentPage(1);
    };

    return (
        <div>
            <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                <Card className="border-l-4 border-l-cyan-500 bg-gradient-to-br from-cyan-50 to-white">
                    <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">
                            Proses
                        </CardTitle>
                        <Calendar className="size-5 text-cyan-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-cyan-600">
                            {JumlahProses}
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Dari {jumlahLayanan} permintaan layanan
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-white">
                    <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">
                            Selesai
                        </CardTitle>
                        <Users className="size-5 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-purple-600">
                            {JumlahSelesai}
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Dari {jumlahLayanan} permintaan layanan
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-rose-500 bg-gradient-to-br from-rose-50 to-white">
                    <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">
                            Menunggu
                        </CardTitle>
                        <Clock className="size-5 text-rose-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-rose-600">
                            {JumlahMenunggu}
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Dari {jumlahLayanan} permintaan layanan
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                    <CardTitle>Daftar Layanan</CardTitle>
                </CardHeader>
                <CardContent>
                    <SearchFilterBar
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        selectedStatus={selectedStatus}
                        onStatusChange={setSelectedStatus}
                    />

                    {filteredData.length === 0 ? (
                        <div className="py-8 text-center">
                            <p className="text-muted-foreground">
                                Tidak ada layanan yang ditemukan. Coba ubah
                                filter atau pencarian Anda.
                            </p>
                        </div>
                    ) : (
                        <>
                            <p className="text-sm text-muted-foreground">
                                Menampilkan {filteredData.length} layanan{' '}
                                {selectedStatus
                                    ? `dengan status ${selectedStatus}`
                                    : ''}
                            </p>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-border">
                                            <th className="px-4 py-3 text-left font-semibold text-foreground">
                                                Tanggal
                                            </th>
                                            <th className="px-4 py-3 text-left font-semibold text-foreground">
                                                Kode Permintaan
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
                                        {paginatedData.map((service: any) => (
                                            <tr
                                                key={service.id}
                                                className="border-borderhover:bg-muted/50 border-b"
                                            >
                                                <td className="px-4 py-3 text-nowrap text-foreground">
                                                    {new Date(
                                                        service.created_at,
                                                    ).toLocaleDateString(
                                                        'id-ID',
                                                        {
                                                            weekday: 'long',
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                        },
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 text-nowrap text-foreground">
                                                    {service.kode_layanan}
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
                        </>
                    )}

                    {filteredData.length > 0 && (
                        <TablePagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            pageSize={pageSize}
                            totalItems={totalItems}
                            onPageChange={setCurrentPage}
                            onPageSizeChange={handlePageSizeChange}
                        />
                    )}
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
