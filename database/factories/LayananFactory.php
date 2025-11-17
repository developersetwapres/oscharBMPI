<?php

namespace Database\Factories;

use App\Models\KategoriLayanan;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Layanan>
 */
class LayananFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->value('id'),
            'kategori_layanan_id' => KategoriLayanan::inRandomOrder()->value('id'),
            'status' => $this->faker->randomElement(['Proses', 'Selesai', 'Menunggu']),
            'detail' => $this->faker->paragraph(),
        ];
    }
}
