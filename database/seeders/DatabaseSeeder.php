<?php

namespace Database\Seeders;

use App\Models\Layanan;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Layanan::factory(100)->create();

        User::firstOrCreate(
            ['email' => 'admin.oscarbpmi@set.wapresri.go.id'],
            [
                'name' => 'Admin Oscar BPMI',
                'jabatan' => 'Administrator',
                'role' => 'administrator',
                'password' => 'P4ssw0rd',
                'email_verified_at' => now(),
            ]
        );
    }
}
