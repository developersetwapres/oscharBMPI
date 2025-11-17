<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleUserMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$role): Response
    {
        $user = $request->user();

        if (in_array($user->role, $role)) {
            return $next($request);
        }

        // Kalau tidak cocok, lempar ke halaman sesuai role user
        return match ($user->role) {
            'administrator' => to_route('dashboard'),
            'pegawai' => to_route('layanan.home'),
            default => abort(403)
        };
    }
}
