import React, { useState, useContext, useEffect } from "react";
import { UseContext } from "../App";
import ReactQuill from 'react-quill'; // import ReactQuill
import { useNavigate, useParams } from "react-router-dom";
<script src="https://cdn.ckeditor.com/ckeditor5/43.1.0/ckeditor5.umd.js"></script>

export default function AddData() {
  const { token } = useContext(UseContext);
  const { id } = useParams();
  const idData = id;
  const navigate = useNavigate();
  const [buttonUpdate, setButtonUpdate] = useState(false)

  // สถานะสำหรับเก็บข้อมูลฟอร์ม
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    category: "",
    tags: "",
    summary: "",
    image_path: "",
    phone: "",
    is_visible: true,
    published_at: "",
  });

  console.log('button', buttonUpdate)
  // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงข้อมูลในฟอร์ม
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value, // สำหรับ checkbox
    });
  };

  // console.log("data", formData)

  // ฟังก์ชันส่งฟอร์มไปยัง API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ใช้ token จาก context
        },
        body: JSON.stringify(formData),
      });
      navigate(`/`);
      // ทำสิ่งที่ต้องการหลังจากส่งข้อมูลสำเร็จ
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdate = async () => {
    const response = await fetch(`http://localhost:8000/api/blog/${idData}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ใช้ token จาก context
      },
      body: JSON.stringify(formData)
    })
    if (response.ok) {
      // setButtonUpdate(false);
      console.log(response)
      navigate(`/admin/${token}`)
    }
  }

  useEffect(() => {
    const fetchIddata = async () => {
      const response = await fetch(`http://localhost:8000/api/blog/${idData}`)
      const data = await response.json()
      setFormData(data);
      setButtonUpdate(true);
    }
    fetchIddata();
  }, [])

  return (
    <div className="container mx-auto p-4">
      {token ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">เพิ่มบทความใหม่</h1>
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">ชื่อเรื่อง</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            {/* Content */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">เนื้อหาของบทความ</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows="6"
                className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              ></textarea>

            </div>

            {/* Author */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">ชื่อผู้เขียน</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            {/* Category */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">หมวดหมู่บทความ</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Tags */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">แท็ก</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="คั่นแต่ละแท็กด้วยเครื่องหมายจุลภาค"
              />
            </div>

            {/* Summary */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">บทสรุป</label>
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleInputChange}
                rows="3"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ></textarea>
            </div>

            {/* Image Path */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">เส้นทางภาพประกอบ</label>
              <input
                type="text"
                name="image_path"
                value={formData.image_path}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">หมายเลขโทรศัพท์</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            {/* Is Visible */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">แสดงข้อมูล</label>
              <input
                type="checkbox"
                name="is_visible"
                checked={formData.is_visible}
                onChange={handleInputChange}
                className="mr-2 leading-tight"
              />
              <span className="text-sm">แสดงบทความนี้</span>
            </div>

            {/* Published At */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">วันที่เผยแพร่</label>
              <input
                type="text"
                name="published_at"
                value={formData.published_at}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between">
              {/* {buttonUpdate ? (
            <button
            onClick={handleUpdate}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            แก้ไขบทความ
          </button>
          ) : (
            <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            เพิ่มบทความ
          </button>
          )} */}

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                เพิ่มบทความ
              </button>

              <button
                onClick={handleUpdate}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                แก้ไขบทความ
              </button>
            </div>
          </form>
        </div>
      ) : ""}
    </div>
  );
}
