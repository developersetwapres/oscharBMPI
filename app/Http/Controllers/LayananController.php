<?php

namespace App\Http\Controllers;

use App\Models\Layanan;
use Inertia\Response;
use App\Http\Requests\StoreLayananRequest;
use App\Http\Requests\UpdateLayananRequest;
use App\Models\KategoriLayanan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LayananController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(KategoriLayanan $kategoriLayanan): Response
    {

        $data = [
            'judul' => $kategoriLayanan->nama_kategori,
            'layanan' => Layanan::where('kategori_layanan_id', $kategoriLayanan->id)->with('user')->latest()->take(100)->get(),

            'jumlahLayanan' => Layanan::where('kategori_layanan_id', $kategoriLayanan->id)->count(),
            'JumlahProses' => Layanan::where('kategori_layanan_id', $kategoriLayanan->id)->where('status', 'Proses')->count(),
            'JumlahMenunggu' => Layanan::where('kategori_layanan_id', $kategoriLayanan->id)->where('status', 'Menunggu')->count(),
            'JumlahSelesai' => Layanan::where('kategori_layanan_id', $kategoriLayanan->id)->where('status', 'Selesai')->count(),
        ];

        return Inertia::render('admin/layanan/page', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $data = [
            'kategoriLayanan' => KategoriLayanan::select(['nama_kategori', 'kode_kategori'])->get(),
        ];

        return Inertia::render('user/form', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLayananRequest $request, KategoriLayanan $kategoriLayanan)
    {
        Layanan::create([
            'user_id' => Auth::id(),
            'kategori_layanan_id' => $kategoriLayanan->id,
            'detail' => $request->detail,
        ]);

        return redirect()->route('layanan.home')->with('success', 'Layanan berhasil diajukan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Layanan $layanan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Layanan $layanan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLayananRequest $request, Layanan $layanan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Layanan $layanan)
    {
        $layanan->delete();
    }

    public function dashboard(): Response
    {
        $data = [
            'JumlahProses' => Layanan::where('status', 'Proses')->count(),
            'JumlahMenunggu' => Layanan::where('status', 'Menunggu')->count(),
            'JumlahSelesai' => Layanan::where('status', 'Selesai')->count(),
            'JumlahUser' => User::where('role', 'pegawai')->count(),
            'JumlahAdmin' => User::where('role', 'administrator')->count(),

            'serviceCategoryData' => KategoriLayanan::withCount('layanans')
                ->get()
                ->map(function ($kategori) {
                    return [
                        'name' => $kategori->nama_kategori,
                        'count' => $kategori->layanans_count,
                    ];
                })
        ];

        return Inertia::render('admin/page', $data);
    }

    public function home(): Response
    {
        $data = [
            'requests' => Layanan::where('user_id', Auth::id())->with('user')->take(100)->latest()->get(),
        ];

        return Inertia::render('user/home', $data);
    }

    public function status(Request $request, Layanan $layanan)
    {
        $request->validate([
            'status' => 'required|string|in:Menunggu,Selesai,Proses',
        ]);

        $layanan->update([
            'status' => $request->status,
        ]);
    }
}
