<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\KategoriLayanan>
 */
class KategoriLayananFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'kode_kategori' => 'KAT-' . strtoupper($this->faker->unique()->bothify('???##')),
            'nama_kategori' => $this->faker->unique()->randomElement(['Pengadaan Logistik', 'Persuratan', 'Kepegawaian', 'Keuangan']),
            'deskripsi' => $this->faker->unique()->sentence(),
        ];
    }
}
