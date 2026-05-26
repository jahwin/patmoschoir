<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $email = config('app.admin_email');
        $password = config('app.admin_password');

        if (blank($email) || blank($password)) {
            $this->command?->warn('Skipping admin user seed: set ADMIN_EMAIL and ADMIN_PASSWORD in your environment.');

            return;
        }

        User::firstOrCreate(
            ['email' => $email],
            [
                'name' => config('app.admin_name', 'Admin'),
                'password' => $password,
                'email_verified_at' => now(),
            ]
        );

        $this->command?->info("Admin user ready: {$email}");
    }
}
