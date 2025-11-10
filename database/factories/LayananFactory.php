<?php

namespace Database\Factories;

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
            'user_id' => 2,
            'tanggal' => $this->faker->date(),
            'kategori' => $this->faker->randomElement(['Pengadaan Logistik', 'Persuratan', 'Kepegawaian' . 'Keuangan']),
            'status' => $this->faker->randomElement(['Proses', 'Selesai', 'Menunggu']),
            'detail' => $this->faker->paragraph(),
        ];
    }
}
