<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            ['name' => 'Group 1'],
            ['name' => 'Group 2'],
            ['name' => 'Group 3'],
            ['name' => 'Group 4'],
            ['name' => 'Group 5'],
        ];

        DB::table('groups')->insert($data);
    }
}
