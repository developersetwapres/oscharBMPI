<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Event;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Matikan pengiriman email verifikasi
        Event::listen(Registered::class, function ($event) {
            // Tidak melakukan apa-apa, sehingga email verifikasi tidak dikirim
        });
    }
}
