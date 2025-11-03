<?php

namespace App\Http\Controllers;

use App\Models\Layanan;
use Inertia\Response;
use App\Http\Requests\StoreLayananRequest;
use App\Http\Requests\UpdateLayananRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        Layanan::create([
            'user_id' => Auth::id(),
            'tanggal' => $request->tanggal,
            'kategori' => $request->kategori,
            'detail' => $request->detail,
        ]);
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
            //
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
