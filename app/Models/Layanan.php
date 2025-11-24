<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Layanan extends Model
{
    /** @use HasFactory<\Database\Factories\LayananFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'kategori_layanan_id',
        'kode_layanan',
        'detail',
        'status',
        'result_document',
        'supporting_documents',
    ];

    protected static function booted()
    {
        static::creating(function ($layanan) {
            do {
                $random = strtoupper(Str::random(5)); // 5 huruf/angka acak
                $code = 'OSC-' . $random;
            } while (self::where('kode_layanan', $code)->exists());

            $layanan->kode_layanan = $code;
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function kategori()
    {
        return $this->belongsTo(KategoriLayanan::class, 'kategori_layanan_id');
    }
}
