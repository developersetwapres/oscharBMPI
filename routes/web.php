<?php

use App\Http\Controllers\LayananController;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::get('/mail-test', function () {
    Mail::raw('Test email OSCAR BPMI', function ($msg) {
        $msg->to('muhammadkhaerilzaid@gmail.com')->subject('Test Email');
    });

    return 'kirim';
});

Route::get('/', function () {
    return redirect()->route('layanan.home');
})->name('home');


Route::middleware(['auth',  'role:pegawai'])->group(function () {
    Route::get('/home', [LayananController::class, 'home'])->name('layanan.home');
});

Route::middleware(['auth', 'verified', 'role:pegawai'])->group(function () {
    Route::get('/layanan', [LayananController::class, 'create'])->name('layanan.create');
    Route::post('layanan/store/{kategoriLayanan:kode_kategori}', [LayananController::class, 'store'])->name('layanan.store');
});

Route::middleware(['auth', 'verified', 'role:administrator'])->group(function () {
    Route::get('/dashboard', [LayananController::class, 'dashboard'])->name('dashboard');

    Route::get('/dashboard/user', [UserController::class, 'index'])->name('user.index');
    Route::put('/dashboard/user/{user}', [UserController::class, 'verify'])->name('user.verify');

    Route::get('/dashboard/layanan/{kategoriLayanan:kode_kategori}', [LayananController::class, 'index'])->name('layanan.index');
    Route::put('/dashboard/layanan/{layanan:kode_layanan}', [LayananController::class, 'status'])->name('layanan.status');
    Route::delete('/dashboard/layanan/{layanan:kode_layanan}', [LayananController::class, 'destroy'])->name('layanan.destroy');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/email.php';
