<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\Request;

class UserController extends Controller
{
    public function index(): Response
    {

        $data = [
            'initialUsers' => User::whereNot('role', 'administrator')->latest()->get(),
            'belumTerverifikasi' => User::whereNull('email_verified_at')
                ->orWhere('email_verified_at', '')
                ->orWhere('email_verified_at', '0000-00-00 00:00:00')
                ->count(),

            'terverifikasi' => User::whereNotNull('email_verified_at')
                ->where('email_verified_at', '!=', '')
                ->where('email_verified_at', '!=', '0000-00-00 00:00:00')
                ->count(),
            'jumlahUser' => User::count(),
        ];

        return Inertia::render('admin/user', $data);
    }

    public function verify(User $user, Request $request)
    {
        if (!$user->hasVerifiedEmail() && $request->verification) {
            $user->markEmailAsVerified();
        } elseif ($user->hasVerifiedEmail() && !$request->verification) {
            $user->email_verified_at = null;
            $user->save();
        }
    }
}
