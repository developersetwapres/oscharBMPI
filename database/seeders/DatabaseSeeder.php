<?php

namespace Database\Seeders;

use App\Models\KategoriLayanan;
use App\Models\Layanan;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        User::create([
            'email' => 'admin.oscarbpmi@set.wapresri.go.id',
            'name' => 'Admin Oscar BPMI',
            'jabatan' => 'Administrator',
            'role' => 'administrator',
            'password' => Hash::make('P4ssw0rd'),
            'email_verified_at' => now(),
        ]);

        User::create([
            'email' => 'user.oscarbpmi@set.wapresri.go.id',
            'name' => 'Pegawai Setwapres',
            'jabatan' => 'User',
            'role' => 'pegawai',
            'password' => Hash::make('Osc4rbpm1'),
            'email_verified_at' => now(),
        ]);

        KategoriLayanan::factory(4)->create();
        Layanan::factory(400)->create();
    }
}
