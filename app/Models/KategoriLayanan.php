<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class KategoriLayanan extends Model
{
    /** @use HasFactory<\Database\Factories\KategoriLayananFactory> */
    use HasFactory;

    protected $fillable = [
        'kode_kategori',
        'nama_kategori',
        'deskripsi',
    ];

    public function layanans(): HasMany
    {
        return $this->hasMany(Layanan::class, 'kategori_layanan_id');
    }
}
