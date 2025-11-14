'use client';

import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Search, X } from 'lucide-react';

interface SearchFilterBarProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    selectedStatus: string | null;
    onStatusChange: (status: string | null) => void;
}

export function SearchFilterBar({
    searchQuery,
    onSearchChange,
    selectedStatus,
    onStatusChange,
}: SearchFilterBarProps) {
    const statusOptions = [
        { value: 'Proses', label: 'Proses' },
        { value: 'Selesai', label: 'Selesai' },
        { value: 'Menunggu', label: 'Menunggu' },
    ];

    return (
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:gap-3">
            <div className="relative flex-1">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Cari berdasarkan nama, kode layanan, atau detail..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-10"
                />
                {searchQuery && (
                    <button
                        onClick={() => onSearchChange('')}
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        aria-label="Clear search"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>

            <Select
                value={selectedStatus || 'Semua Status'}
                onValueChange={(value) =>
                    onStatusChange(value === 'Semua Status' ? null : value)
                }
            >
                <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Semua Status">Semua Status</SelectItem>
                    {statusOptions.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                            {status.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
