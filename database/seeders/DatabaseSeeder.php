<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Konekt\Address\Seeds\Countries;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(Countries::class);

        $this->call(CitiesOfUkraineSeeder::class);

        $this->call([
            RolesSeeder::class,
        ]);

        //Create admin
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@mail.com',
            'password' => bcrypt('changeme'),
        ])->assignRole('admin');

//        //Create customer
//        User::factory()->create([
//            'name' => 'Customer',
//            'email' => 'customer@mail.com',
//            'password' => bcrypt('customer'),
//        ])->assignRole('customer');
//
//        //Create seller
//        User::factory()->create([
//            'name' => 'Seller',
//            'email' => 'seller@mail.com',
//            'password' => bcrypt('seller'),
//        ])->assignRole('seller');
//
//        //Create manager
//        User::factory()->create([
//            'name' => 'Manager',
//            'email' => 'manager@mail.com',
//            'password' => bcrypt('manager'),
//        ])->assignRole('manager');
//
//        //Create moderator
//        User::factory()->create([
//            'name' => 'Moderator',
//            'email' => 'moderator@mail.com',
//            'password' => bcrypt('moderator'),
//        ])->assignRole('moderator');
    }
}
