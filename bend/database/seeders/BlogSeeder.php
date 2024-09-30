<?php

namespace Database\Seeders;

use App\Models\Blog;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Blog::insert(
            [
                [

                    'title' => 'บทความแรก',
                    'content' => 'นี่คือเนื้อหาของบทความแรกที่ให้ข้อมูลเกี่ยวกับ...',
                    'author' => 'ผู้เขียน 1',
                    'category' => 'หมวดหมู่ 1',
                    'tags' => 'tag1, tag2',
                    'summary' => 'บทสรุปของบทความแรก',
                    'image_path' => 'path/to/image1.jpg',
                    'phone' => '3662352',
                    'is_visible' => true,
                    'published_at' => "121212",
                ],
                [
                    'title' => 'บทความที่สอง',
                    'content' => 'นี่คือเนื้อหาของบทความที่สอง...',
                    'author' => 'ผู้เขียน 2',
                    'category' => 'หมวดหมู่ 2',
                    'tags' => 'tag3, tag4',
                    'summary' => 'บทสรุปของบทความที่สอง',
                    'image_path' => 'path/to/image2.jpg',
                    'phone' => '12524355',
                    'is_visible' => true,
                    'published_at' => "121212",
                ],
                [
                    'title' => 'บทความที่สาม',
                    'content' => 'นี่คือเนื้อหาของบทความที่สาม...',
                    'author' => 'ผู้เขียน 3',
                    'category' => 'หมวดหมู่ 3',
                    'tags' => 'tag5, tag6',
                    'summary' => 'บทสรุปของบทความที่สาม',
                    'image_path' => 'path/to/image3.jpg',

                    'phone' => '12345676',
                    'is_visible' => true,
                    'published_at' => "121212",
                ]
            ]
        );
    }
}
