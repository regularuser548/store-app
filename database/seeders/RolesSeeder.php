<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Konekt\Acl\Models\Role;

class RolesSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()['cache']->forget('konekt.acl.cache');

        // create customer roles
        Role::create(['name' => 'customer']);
        Role::create(['name' => 'seller']);

        // create stuff roles
        Role::create(['name' => 'admin']);
        Role::create(['name' => 'manager']);
        Role::create(['name' => 'moderator']);
    }
}
