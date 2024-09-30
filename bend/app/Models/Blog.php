<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'content',
        'author',
        'category',
        'tags',
        'summary',
        'image_path',
        'phone',
        'is_visible',
        'published_at',
    ];
}
