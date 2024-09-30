<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // ชื่อเรื่อง
            $table->text('content'); // เนื้อหาของบทความ
            $table->string('author'); // ชื่อผู้เขียน
            $table->string('category'); // หมวดหมู่บทความ
            $table->string('tags')->nullable(); // แท็กสำหรับบทความ
            $table->text('summary')->nullable(); // บทสรุปของบทความ
            $table->string('image_path')->nullable(); // เส้นทางภาพประกอบ 
            // $table->unsignedInteger('views')->default(0); // จำนวนผู้เข้าชม
            // $table->unsignedInteger('likes')->default(0); // จำนวนไลค์
            // $table->unsignedInteger('shares')->default(0); // จำนวนแชร์
            $table->string('phone'); // ชื่อสำหรับ SEO 
            $table->boolean('is_visible')->default(true); // แสดงข้อมูลหรือไม่
            $table->string('published_at')->nullable(); // วันที่เผยแพร่
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }

};
