'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KategoriLayanan } from '@/types';
import { Layers, ShieldCheck, Users } from 'lucide-react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

export function DashboardPage({
    JumlahProses,
    JumlahMenunggu,
    JumlahSelesai,
    serviceCategoryData,
    JumlahUser,
    JumlahAdmin,
}: {
    JumlahProses: number;
    JumlahMenunggu: number;
    JumlahSelesai: number;
    serviceCategoryData: KategoriLayanan[];
    JumlahUser: number;
    JumlahAdmin: number;
}) {
    const statusDistribution = [
        { name: 'Proses', value: JumlahProses, fill: '#3b82f6' },
        { name: 'Selesai', value: JumlahSelesai, fill: '#06b6d4' },
        { name: 'Menunggu', value: JumlahMenunggu, fill: '#f59e0b' },
    ];

    const totalServices = statusDistribution.reduce(
        (sum, item) => sum + item.value,
        0,
    );

    return (
        <div>
            <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                <Card className="border-l-4 border-l-cyan-500 bg-gradient-to-br from-cyan-50 to-white">
                    <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">
                            Total Layanan
                        </CardTitle>
                        <Layers className="size-5 text-cyan-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-cyan-600">
                            {totalServices}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-white">
                    <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">
                            Jumlah User
                        </CardTitle>
                        <Users className="size-5 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-purple-600">
                            {JumlahUser}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-rose-500 bg-gradient-to-br from-rose-50 to-white">
                    <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">
                            Jumlah Admin
                        </CardTitle>
                        <ShieldCheck className="size-5 text-rose-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-rose-600">
                            {JumlahAdmin}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Distribusi Status</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <ResponsiveContainer width="100%" height={400}>
                            <PieChart>
                                <Pie
                                    data={statusDistribution}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, value }) =>
                                        `${name}: ${value}`
                                    }
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {statusDistribution.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.fill}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Layanan per Kategori</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={serviceCategoryData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="name"
                                    angle={-45}
                                    textAnchor="end"
                                    height={100}
                                    interval={0}
                                />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#3b82f6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
