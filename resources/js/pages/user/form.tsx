'use client';

import { FooterUser } from '@/components/oscar/footer-user';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { store } from '@/routes/layanan';
import { KategoriLayanan, SharedData } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { FileText, LogOut, Upload, X } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';

interface initailProps {
    kategoriLayanan: KategoriLayanan[];
}

export default function UserPage({ kategoriLayanan }: initailProps) {
    const { auth } = usePage<SharedData>().props;

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [fileUpload, setFileUpload] = useState(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.type === 'application/pdf') {
                setFileName(file.name);
                setFileUpload(file);
                const url = URL.createObjectURL(file);
                setPreviewUrl(url);
            } else {
                alert('Mohon upload file PDF');
            }
        }
    };

    const clearFile = () => {
        setPreviewUrl(null);
        setFileName(null);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            kategori: formData.get('kategori'),
            detail: formData.get('detail'),
            supportingDocuments: fileUpload,
        };

        router.post(store.url(data.kategori), data, {
            onSuccess: () => {
                (e.target as HTMLFormElement).reset();
            },
            onError: (errors) => {
                console.error('Terjadi kesalahan:', errors);
            },
        });
    };

    return (
        <>
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
                        <Link href="/">
                            <button className="flex items-center gap-2 rounded-md border border-input bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">
                                <LogOut className="h-4 w-4" />
                                Kembali
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="spacae-y-8 mx-auto max-w-3xl px-4 py-8 md:py-12">
                    <div className="mx-auto max-w-2xl">
                        <div className="mb-12 text-center">
                            <div className="mb-5 flex justify-center">
                                <div className="h-16 w-16 items-center">
                                    <img src="/image/logo.png" alt="" />
                                </div>
                            </div>

                            <h1 className="mb-1.5 text-2xl font-bold md:text-4xl">
                                Formulir Pendaftaran Layanan
                                <br />
                            </h1>
                            <h1 className="mb-3 text-2xl font-bold md:text-4xl">
                                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    Oscar BPMI
                                </span>
                            </h1>

                            {/* Divider */}
                            <div className="mx-auto mb-5 h-1 w-28 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400" />

                            <div className="space-y-1">
                                <p className="mx-auto max-w-lg leading-relaxed text-muted-foreground">
                                    Isi formulir di bawah untuk mengajukan
                                    permintaan layanan administrasi
                                </p>
                            </div>
                        </div>

                        <Card>
                            <CardContent className="pt-5">
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Nama
                                        </label>
                                        <input
                                            type="text"
                                            name="nama"
                                            defaultValue={auth.user.name}
                                            disabled
                                            className="w-full rounded-md border border-input bg-muted px-3 py-2 text-foreground"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Jabatan
                                        </label>
                                        <input
                                            type="text"
                                            name="jabatan"
                                            defaultValue={auth.user.jabatan}
                                            disabled
                                            className="w-full rounded-md border border-input bg-muted px-3 py-2 text-foreground"
                                        />
                                    </div>

                                    {/* <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        Tanggal
                                    </label>
                                    <input
                                        type="date"
                                        name="tanggal"
                                        required
                                        className="w-full rounded-md border border-input bg-card px-3 py-2 text-foreground"
                                    />
                                </div> */}

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Kategori Layanan
                                        </label>
                                        <select
                                            name="kategori"
                                            required
                                            className="w-full rounded-md border border-input bg-card px-3 py-2 text-foreground"
                                        >
                                            <option value="">
                                                Pilih kategori...
                                            </option>

                                            {kategoriLayanan.map((kategori) => (
                                                <option
                                                    key={kategori.kode_kategori}
                                                    value={
                                                        kategori.kode_kategori
                                                    }
                                                >
                                                    {kategori.nama_kategori}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Detail Layanan
                                        </label>
                                        <textarea
                                            name="detail"
                                            required
                                            rows={4}
                                            className="w-full resize-none rounded-md border border-input bg-card px-3 py-2 text-foreground"
                                            placeholder="Jelaskan detail permintaan layanan Anda..."
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Dokumen Pendukung (PDF)
                                        </label>
                                        {!previewUrl ? (
                                            <div className="relative flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-input p-6 text-center transition-colors hover:bg-muted/50">
                                                <input
                                                    type="file"
                                                    name="dokumen"
                                                    accept=".pdf"
                                                    onChange={handleFileChange}
                                                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                                                />
                                                <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                                                <p className="text-sm font-medium text-foreground">
                                                    Klik untuk upload dokumen
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    Format PDF, maks 5MB
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between rounded-md border bg-muted/20 p-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="rounded bg-red-100 p-2 text-red-600">
                                                            <FileText className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium">
                                                                {fileName}
                                                            </p>
                                                            <p className="text-xs text-muted-foreground">
                                                                Siap diupload
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={clearFile}
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                                <div className="aspect-[16/9] w-full overflow-hidden rounded-md border bg-muted">
                                                    <iframe
                                                        src={previewUrl}
                                                        className="h-full w-full"
                                                        title="PDF Preview"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-primary hover:bg-primary/90"
                                    >
                                        Kirim
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <FooterUser />
        </>
    );
}
