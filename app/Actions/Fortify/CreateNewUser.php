<?php

namespace App\Actions\Fortify;

use App\Mail\RegistrationPendingMail;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'password' => $this->passwordRules(),
            'jabatan' => ['required', 'string', 'max:255'],
        ])->validate();

        // Simpan user
        $user = User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'jabatan' => $input['jabatan'],
            'password' => Hash::make($input['password']),
            'role' => 'pegawai',
        ]);

        // Kirim email notifikasi
        try {
            Mail::to($user->email)->send(
                new RegistrationPendingMail(
                    $user->name,
                    $user->email,
                )
            );
        } catch (\Exception $e) {
            Log::error("Gagal kirim email registrasi: " . $e->getMessage());
        }

        return $user;
    }
}
