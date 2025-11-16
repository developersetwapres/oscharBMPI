<?php

namespace App\Http\Controllers;

use App\Models\Layanan;
use Illuminate\Support\Facades\Log;
use Inertia\Response;
use App\Http\Requests\StoreLayananRequest;
use App\Http\Requests\UpdateLayananRequest;
use App\Mail\ServiceSubmittedMail;
use App\Mail\ServiceStatusUpdateMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;

class LayananController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($layanan): Response
    {
        $judul = ucwords(str_replace('-', ' ', $layanan));

        $data = [
            'judul' => $judul,
            'services' => Layanan::where('kategori', $judul)->with('user')->get(),
        ];

        return Inertia::render('admin/layanan/page', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('user/form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLayananRequest $request)
    {
        // 1. Simpan layanan
        $layanan = Layanan::create([
            'user_id' => Auth::id(),
            'tanggal' => $request->tanggal,
            'kategori' => $request->kategori,
            'detail' => $request->detail,
        ]);

        // 2. Ambil user
        $user = Auth::user();

        // 3. Kirim email notifikasi
        try {
            Mail::to($user->email)->send(
                new ServiceSubmittedMail(
                    $user->name,
                    $layanan->kode_layanan,
                    $layanan->kategori
                )
            );
        } catch (\Exception $e) {
            // opsional: log error
            Log::error("Gagal mengirim email: " . $e->getMessage());
        }
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
            //
        ];

        return Inertia::render('admin/page', $data);
    }

    public function home(): Response
    {
        $data = [
            'requests' => Layanan::where('user_id', Auth::id())->with('user')->take(100)->get(),
        ];

        return Inertia::render('user/home', $data);
    }

    public function status(Request $request, Layanan $layanan)
    {
        $request->validate([
            'status' => 'required|string|in:Menunggu,Selesai,Proses',
        ]);

        // 1. Update status
        $layanan->update([
            'status' => $request->status,
        ]);

        // 2. Ambil user terkait layanan
        $user = $layanan->user;

        // 3. Kirim email notifikasi perubahan status
        try {
            Mail::to($user->email)->send(
                new ServiceStatusUpdateMail(
                    $user->name,
                    $layanan->kode,
                    $layanan->kategori,
                    $request->kode_layanan // status baru
                )
            );
        } catch (\Exception $e) {
            Log::error("Gagal kirim email status layanan: " . $e->getMessage());
            dd('oer');
        }
    }
}
