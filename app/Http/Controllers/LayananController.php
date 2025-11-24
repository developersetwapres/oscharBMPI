<?php

namespace App\Http\Controllers;

use App\Models\Layanan;
use Illuminate\Support\Facades\Log;
use Inertia\Response;
use App\Http\Requests\StoreLayananRequest;
use App\Http\Requests\UpdateLayananRequest;
use App\Mail\ServiceSubmittedMail;
use App\Mail\ServiceStatusUpdateMail;
use App\Models\KategoriLayanan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
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

        return Inertia::render('admin/layanan', $data);
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
        $path = $request->file('supportingDocuments')->store('document/support', 'public');

        // 1. Simpan layanan
        $layanan = Layanan::create([
            'user_id' => Auth::id(),
            'kategori_layanan_id' => $kategoriLayanan->id,
            'detail' => $request->detail,
            'supporting_documents' => $path,
        ]);

        // Load relasi kategori
        $layanan->load(['kategori', 'user']);

        // 3. Kirim email notifikasi
        try {
            Mail::to($layanan->user->email)->send(
                new ServiceSubmittedMail(
                    $layanan->user->name,
                    $layanan->kode_layanan,
                    $layanan->kategori->nama_kategori
                )
            );
        } catch (\Exception $e) {
            // opsional: log error
            Log::error("Gagal mengirim email: " . $e->getMessage());
        }

        return redirect()->route('layanan.home')->with('success', 'Layanan berhasil diajukan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Layanan $layanan)
    {
        $data = [
            'service' =>  $layanan->load(['user', 'kategori'])
        ];

        return Inertia::render('admin/detail', $data);
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

        return back()->with('success', "Layanan No. {$layanan->kode_layanan} an. {$layanan->user->name} telah dihapus.");
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
            'requests' => Layanan::where('user_id', Auth::id())->with(['user', 'kategori'])->take(100)->latest()->get(),
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
        // Load relasi kategori
        $layanan->load(['kategori', 'user']);

        // 3. Kirim email notifikasi perubahan status
        try {
            Mail::to($layanan->user->email)->send(
                new ServiceStatusUpdateMail(
                    $layanan->user->name,
                    $layanan->kode_layanan,
                    $layanan->kategori->nama_kategori,
                    $layanan->status
                )
            );
        } catch (\Exception $e) {
            Log::error("Gagal kirim email status layanan: " . $e->getMessage());
        }
    }


    public function resultDocument(Request $request, Layanan $layanan)
    {

        $request->validate([
            'fileResultService' => 'required|file|mimes:pdf|max:5120',
        ]);

        $path = $request->file('fileResultService')->store('document/result', 'public');

        $layanan->update([
            'result_document' => $path,
            'status' => 'Selesai',
        ]);

        // 3. Kirim email notifikasi perubahan status
        try {
            Mail::to($layanan->user->email)->send(
                new ServiceStatusUpdateMail(
                    $layanan->user->name,
                    $layanan->kode_layanan,
                    $layanan->kategori->nama_kategori,
                    $layanan->status
                )
            );
        } catch (\Exception $e) {
            Log::error("Gagal kirim email status layanan: " . $e->getMessage());
        }

        return back()->with('success', "File Document Hasil berhasil diunggah.");
    }
}
