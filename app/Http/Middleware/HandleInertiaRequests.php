<?php

namespace App\Http\Middleware;

use App\Models\KategoriLayanan;
use App\Models\Layanan;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            // 'layananCategories' => function () {
            //     return KategoriLayanan::select(['nama_kategori', 'kode_kategori'])->get();
            // },

            // Ambil kategori + hitung layanannya per kategori
            'layananCategories' => function () {
                return KategoriLayanan::withCount([
                    'layanans as jumlah' => function ($q) {
                        $q->where('status', 'Menunggu');
                    }
                ])
                    ->get()
                    ->map(fn($kategori) => [
                        'nama_kategori' => $kategori->nama_kategori,
                        'kode_kategori' => $kategori->kode_kategori,
                        'jumlah' => $kategori->jumlah,
                    ]);
            },

            'flash' => [
                'success' => fn() => $request->session()->get('success'),
            ],
        ];
    }
}
