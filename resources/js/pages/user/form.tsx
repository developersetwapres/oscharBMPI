'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { store } from '@/routes/layanan';
import { SharedData } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { LogOut } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';

export default function UserPage() {
    const { auth } = usePage<SharedData>().props;

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            tanggal: formData.get('tanggal'),
            kategori: formData.get('kategori'),
            detail: formData.get('detail'),
        };

        router.post(store.url(), data, {
            onSuccess: () => {
                (e.target as HTMLFormElement).reset();
                setSubmitted(true);
            },
            onError: (errors) => {
                console.error('Terjadi kesalahan:', errors);
            },
        });
    };

    return (
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
                            <form onSubmit={handleSubmit} className="space-y-6">
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

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        Tanggal
                                    </label>
                                    <input
                                        type="date"
                                        name="tanggal"
                                        required
                                        className="w-full rounded-md border border-input bg-card px-3 py-2 text-foreground"
                                    />
                                </div>

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
                                        <option value="Keuangan">
                                            Keuangan
                                        </option>
                                        <option value="Pengadaan Logistik">
                                            Pengadaan Logistik
                                        </option>
                                        <option value="Kepegawaian">
                                            Kepegawaian
                                        </option>
                                        <option value="Persuratan">
                                            Persuratan
                                        </option>
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

                                <Button
                                    type="submit"
                                    className="w-full bg-primary hover:bg-primary/90"
                                >
                                    Kirim
                                </Button>

                                {submitted && (
                                    <div className="rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                                        ✓ Permintaan layanan berhasil dikirim!
                                    </div>
                                )}
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
