import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate(); // สร้างฟังก์ชันสำหรับเปลี่ยนเส้นทางการนำทางใน React Router
  const [formData, setFormData] = useState({ // สร้าง state สำหรับเก็บข้อมูลฟอร์ม
    name: '',
    email: '',
    password: '',
  });
  
  // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงค่าของฟิลด์ในฟอร์ม
  const handleChange = (e) => {
    const { name, value } = e.target; // ดึงชื่อและค่าจากฟิลด์ที่ถูกเปลี่ยนแปลง
    setFormData({ ...formData, [name]: value }); // อัพเดทค่าใน state โดยรักษาค่าที่มีอยู่เดิม
  };
    
  // ฟังก์ชันสำหรับจัดการการส่งฟอร์ม
  const handleSubmit = async (e) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้าเมื่อส่งฟอร์ม
    try {
      // ทำการส่งข้อมูลไปยัง API เพื่อสมัครสมาชิก
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json" // กำหนดประเภทข้อมูลที่ส่งเป็น JSON
        },
        body: JSON.stringify(formData) // แปลงข้อมูลฟอร์มเป็น JSON
      });
      // const data = await response.json(); // ถ้าต้องการใช้งานข้อมูลที่ส่งกลับจาก API สามารถใช้งานบรรทัดนี้ได้
      navigate('/login'); // เปลี่ยนเส้นทางไปที่หน้าเข้าสู่ระบบหลังจากสมัครสมาชิกสำเร็จ
    } catch (error) {
      console.error("error create data", error); // แสดงข้อผิดพลาดหากเกิดปัญหาในการสมัครสมาชิก
    }
  };
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Register</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" >
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
          <label className="block text-gray-700 text-sm font-bold mb-2" >
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;