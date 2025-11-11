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
    ];

    protected static function booted()
    {
        static::creating(function ($layanan) {
            do {
                $random = strtoupper(Str::random(5)); // 5 huruf/angka acak
                $code = 'OSH-' . $random;
            } while (self::where('code', $code)->exists());

            $layanan->kode_layanan = $code;
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
