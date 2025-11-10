<?php

use App\Http\Controllers\LayananController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    // return Inertia::render('welcome', [
    //     'canRegister' => Features::enabled(Features::registration()),
    // ]);

    return redirect()->route('layanan.home');
})->name('home');

Route::middleware(['auth', 'verified', 'role:pegawai'])->group(function () {
    Route::get('/home', [LayananController::class, 'home'])->name('layanan.home');
    Route::get('/layanan', [LayananController::class, 'create'])->name('layanan.create');
    Route::post('layanan/store', [LayananController::class, 'store'])->name('layanan.store');
});


Route::middleware(['auth', 'verified', 'role:administrator'])->group(function () {
    Route::get('/dashboard', [LayananController::class, 'dashboard'])->name('dashboard');

    Route::get('/dashboard/layanan/{layanan}', [LayananController::class, 'index'])->name('layanan.index');
    Route::put('/dashboard/layanan/{layanan:kode_layanan}', [LayananController::class, 'status'])->name('layanan.status');
    Route::delete('/dashboard/layanan/{layanan:kode_layanan}', [LayananController::class, 'destroy'])->name('layanan.destroy');
});

require __DIR__ . '/settings.php';
