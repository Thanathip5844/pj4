<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Blog; // Assumed Blog model is being used

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // ตรวจสอบ token ที่ส่งมาใน header
        $token = $request->header('Authorization');

        // ตรวจสอบว่ามี token หรือไม่
        if ($token) {
            // คุณสามารถเพิ่มตรรกะเพื่อตรวจสอบความถูกต้องของ token ที่นี่
            // เช่น การตรวจสอบใน database หรือใช้ JWT
            // สมมุติว่า token ถูกต้อง ให้ดึงข้อมูลทั้งหมด
            $blogs = Blog::all();
        } else {
            // ถ้าไม่มี token หรือ token ไม่ถูกต้อง ให้ดึงเฉพาะข้อมูลที่ is_visible เป็น true
            $blogs = Blog::where('is_visible', true)->get();
        }
        return response()->json($blogs, 200); // Return all blog records as JSON
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
            'author' => 'required|string',
            'category' => 'required|string',
            'tags' => 'nullable|string',
            'summary' => 'nullable|string',
            'image_path' => 'nullable|string',
            'phone' => 'required|string',
            'is_visible' => 'nullable|boolean',
            'published_at' => 'nullable|string',
        ]);

        $blog = Blog::create($validatedData);

        return response()->json([
            'message' => 'Blog created successfully!',
            'data' => $blog
        ], 201);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $blog = Blog::find($id);

        if ($blog) {
            return response()->json($blog, 200);
        }

        return response()->json(['message' => 'Blog not found'], 404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
{
    try {
        // ค้นหา blog ตาม id
        $blog = Blog::find($id);

        // ตรวจสอบว่า blog ที่ต้องการอัปเดตมีอยู่หรือไม่
        if (!$blog) {
            return response()->json(['message' => 'Blog not found'], 404);
        }

        // ตรวจสอบข้อมูลที่ส่งมาว่าถูกต้องหรือไม่
        $validatedData = $request->validate([
            'title' => 'string',
            'content' => 'string',
            'author' => 'string',
            'category' => 'string',
            'tags' => 'nullable|string',
            'summary' => 'nullable|string',
            'image_path' => 'nullable|string',
            'phone' => 'string',
            'is_visible' => 'nullable|boolean',
            'published_at' => 'nullable|string',
        ]);

        // อัปเดตข้อมูล blog
        $blog->update($validatedData);

        // ส่งผลลัพธ์การอัปเดตกลับมา
        return response()->json([
            'message' => 'Blog updated successfully!',
            'data' => $blog
        ], 200);

    } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
        // จัดการกรณีที่ไม่พบ blog ที่ต้องการอัปเดต
        return response()->json(['error' => 'Blog not found'], 404);

    } catch (\Illuminate\Validation\ValidationException $e) {
        // จัดการกรณีที่ข้อมูลที่ส่งมาไม่ถูกต้อง
        return response()->json(['error' => 'Validation error', 'messages' => $e->errors()], 422);

    } catch (\Exception $e) {
        // จัดการข้อผิดพลาดทั่วไป
        return response()->json(['error' => 'An error occurred while updating the blog', 'details' => $e->getMessage()], 500);
    }
}



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $blog = Blog::find($id);

        if (!$blog) {
            return response()->json(['message' => 'Blog not found'], 404);
        }

        $blog->delete();

        return response()->json(['message' => 'Blog deleted successfully!'], 200);
    }
}
