'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { destroy, result, status } from '@/routes/layanan';
import { BreadcrumbItem, Layanan, SharedData } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { ArrowLeft, FileText, Save, Upload, X } from 'lucide-react';
import { useEffect, useState } from 'react';

type Props = { service: Layanan };

export default function DetailLayananPage({ service }: Props) {
    const { flash } = usePage<SharedData>().props;
    const { toast } = useToast();

    // const [status, setStatus] = useState(service.status);
    const [isSaving, setIsSaving] = useState(false);

    const [fileResultService, setFileResultService] = useState<File | null>(
        null,
    );

    const serverFileUrl = service.result_document
        ? `/storage/${service.result_document}`
        : null;

    const [previewUrl, setPreviewUrl] = useState<string | null>(serverFileUrl);

    const [showUserDocPreview, setShowUserDocPreview] = useState(false);

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

    const handleSave = () => {
        if (!fileResultService) return;

        setIsSaving(true);
        router.post(
            result.url(service.kode_layanan),
            {
                fileResultService,
            },
            {
                forceFormData: true,
                onSuccess: () => {
                    setIsSaving(false);
                },
                onError: () => {
                    setIsSaving(false);
                },
            },
        );
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0]) return;
        const file = e.target.files[0];

        if (file.type !== 'application/pdf') return;

        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        setFileResultService(file);
    };

    const handleRemoveUpload = () => {
        setPreviewUrl(serverFileUrl);
        setFileResultService(null);
    };

    const handleDelete = (kodeLayanan: string) => {
        router.delete(destroy.url(kodeLayanan), {
            onError: (errors) => {
                console.error('Error updating status:', errors);
            },
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: service.user?.name,
            href: dashboard().url,
        },
    ];

    useEffect(() => {
        if (flash.success) {
            toast({ title: 'Berhasil', description: flash.success });
        }
    }, [flash.success]);

    useEffect(() => {
        return () => {
            if (previewUrl && previewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    useEffect(() => {
        if (flash.success) {
            setFileResultService(null); // reset state upload
            setPreviewUrl(serverFileUrl); // kembalikan ke file dari server
        }
    }, [flash.success]);

    const disableSave = isSaving || !fileResultService;

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
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={service.user?.name} />
            <div className="m-3 flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl bg-gradient-to-tr from-white via-background to-blue-100 p-4">
                <div className="max-w-7xl flex-1 overflow-auto">
                    <div className="mb-6 flex items-center gap-4">
                        <Button
                            onClick={() => window.history.back()}
                            variant="ghost"
                            size="icon"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">
                                Detail Layanan #{service.kode_layanan}
                            </h1>
                            <p className="text-muted-foreground">
                                Kelola permintaan layanan administrasi
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        <div className="space-y-6 lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Informasi Pemohon</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">
                                                Nama Lengkap
                                            </label>
                                            <p className="text-base font-medium">
                                                {service.user.name}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">
                                                Jabatan
                                            </label>
                                            <p className="text-base font-medium">
                                                {service.user.jabatan}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">
                                                Tanggal Pengajuan
                                            </label>
                                            <p className="text-base font-medium">
                                                {new Date(
                                                    service.created_at,
                                                ).toLocaleDateString('id-ID', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">
                                                Kategori
                                            </label>
                                            <p className="text-base font-medium">
                                                {service.kategori.nama_kategori}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Detail Permintaan</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-muted-foreground">
                                            Deskripsi Layanan
                                        </label>
                                        <div className="rounded-md border border-border bg-muted/30 p-4 text-sm leading-relaxed">
                                            {service.detail}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-muted-foreground">
                                            Dokumen Pendukung (User)
                                        </label>
                                        <div className="space-y-4">
                                            <div className="group flex cursor-pointer items-center gap-3 rounded-md border border-border bg-card p-3 transition-colors hover:bg-muted/50">
                                                <div className="rounded bg-red-100 p-2 text-red-600">
                                                    <FileText className="h-5 w-5" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium transition-colors group-hover:text-primary">
                                                        {
                                                            service.supporting_documents
                                                        }
                                                    </p>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-primary"
                                                    onClick={() =>
                                                        setShowUserDocPreview(
                                                            !showUserDocPreview,
                                                        )
                                                    }
                                                >
                                                    {showUserDocPreview
                                                        ? 'Tutup Preview'
                                                        : 'Lihat Preview'}
                                                </Button>
                                            </div>
                                            {showUserDocPreview && (
                                                <div className="flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-md border bg-muted">
                                                    <iframe
                                                        src={`/storage/${service.supporting_documents}`}
                                                        className="h-full w-full"
                                                        title="Result Preview"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-6">
                            <Card className="min-h-full">
                                <CardHeader>
                                    <CardTitle>Tindak Lanjut</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Status Layanan
                                        </label>

                                        <select
                                            value={service.status}
                                            onChange={(e) =>
                                                handleStatusChange(
                                                    service.kode_layanan,
                                                    e.target.value,
                                                )
                                            }
                                            className={`w-full cursor-pointer rounded-md border border-input px-3 py-1.5 font-medium text-foreground transition-colors ${getStatusStyles(service.status)}`}
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
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Upload Dokumen Hasil
                                        </label>

                                        {!previewUrl || previewUrl === '' ? (
                                            <div className="relative flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-input p-4 text-center hover:bg-muted/50">
                                                <input
                                                    type="file"
                                                    accept=".pdf"
                                                    onChange={handleFileUpload}
                                                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                                                />
                                                <Upload className="mb-2 h-6 w-6 text-muted-foreground" />
                                                <p className="text-xs font-medium text-foreground">
                                                    Upload Hasil (PDF)
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between rounded-md border bg-muted/20 p-2">
                                                    <div className="flex items-center gap-2">
                                                        <FileText className="h-4 w-4 text-red-600" />
                                                        <span className="text-xs font-medium">
                                                            Dokumen Hasil
                                                        </span>
                                                    </div>
                                                    {fileResultService && (
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-6 w-6"
                                                            onClick={
                                                                handleRemoveUpload
                                                            }
                                                        >
                                                            <X className="h-3 w-3" />
                                                        </Button>
                                                    )}
                                                </div>

                                                <div className="aspect-video w-full overflow-hidden rounded-md border bg-muted">
                                                    <iframe
                                                        src={previewUrl}
                                                        className="h-full w-full"
                                                        title="Result Preview"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <Button
                                        className="w-full"
                                        onClick={handleSave}
                                        disabled={disableSave}
                                    >
                                        {isSaving ? (
                                            'Menyimpan...'
                                        ) : (
                                            <>
                                                <Save className="mr-2 h-4 w-4" />{' '}
                                                Simpan Perubahan
                                            </>
                                        )}
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* <Card className="border-red-200 bg-red-50/30">
                                <CardContent className="pt-6">
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                variant="destructive"
                                                className="w-full"
                                            >
                                                <Trash2 className="mr-2 h-4 w-4" />{' '}
                                                Hapus Layanan
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    Hapus Layanan
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Apakah Anda yakin ingin
                                                    menghapus layanan ini?
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <div className="mt-4 flex justify-end gap-3">
                                                <AlertDialogCancel>
                                                    Batal
                                                </AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() =>
                                                        handleDelete(
                                                            service.kode_layanan,
                                                        )
                                                    }
                                                    className="bg-red-600 hover:bg-red-700"
                                                >
                                                    Ya, Hapus
                                                </AlertDialogAction>
                                            </div>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </CardContent>
                            </Card> */}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
