import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseContext } from "../App";

const Login = () => {
  const navigate = useNavigate(); // สร้างฟังก์ชันสำหรับเปลี่ยนเส้นทางการนำทางใน React Router
const { token, setToken } = useContext(UseContext); // ใช้ context เพื่อเข้าถึง token และฟังก์ชันในการตั้งค่า token
const [formData, setFormData] = useState({ // สร้าง state สำหรับเก็บข้อมูลฟอร์มเข้าสู่ระบบ
  email: "",
  password: "",
});

// ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงค่าของฟิลด์ในฟอร์ม
const handleChange = (e) => {
  const { name, value } = e.target; // ดึงชื่อและค่าจากฟิลด์ที่ถูกเปลี่ยนแปลง
  setFormData({ ...formData, [name]: value }); // อัพเดทค่าใน state โดยรักษาค่าที่มีอยู่เดิม
};

// ฟังก์ชันสำหรับจัดการการส่งฟอร์มเข้าสู่ระบบ
const handleSubmit = async (e) => {
  e.preventDefault(); // ป้องกันการรีเฟรชหน้าเมื่อส่งฟอร์ม
  try {
    // ทำการส่งข้อมูลไปยัง API เพื่อเข้าสู่ระบบ
    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // กำหนดประเภทข้อมูลที่ส่งเป็น JSON
      },
      body: JSON.stringify(formData), // แปลงข้อมูลฟอร์มเป็น JSON
    });
    const data = await response.json(); // รับข้อมูล JSON ที่ส่งกลับจาก API
    setToken(data.token); // ตั้งค่า token ใน context ด้วย token ที่ได้รับจาก API
    navigate(`/admin/${data.token}`); // เปลี่ยนเส้นทางไปที่หน้าแอดมิน พร้อมส่ง token เป็นพารามิเตอร์ใน URL
  } catch (error) {
    console.error("error create data", error); // แสดงข้อผิดพลาดหากเกิดปัญหาในการเข้าสู่ระบบ
  }
};


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            onKeyDown={handleKeyDown}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;