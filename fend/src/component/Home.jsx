import React, { useEffect, useState } from "react";

export default function Home() {
    const [dataBlog, setDataBlog] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null); // To track the selected blog for detailed view

    console.log("data", dataBlog);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/blog"); // แก้ URL นี้ให้ตรงกับ API ของคุณ
                const data = await response.json();
                setDataBlog(data);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };

        fetchBlog();
    }, []);

    const handleShowData = (item) => {
        setSelectedBlog(item); // Set the selected blog to show in the modal
    };

    const handleCloseModal = () => {
        setSelectedBlog(null); // Clear the selected blog to close the modal
    };

    return (
        <div className="ml-[8rem] mr-[8rem]">
            <h1 className="text-4xl">บทความล่าสุด</h1>
            <br />
            <hr className="mb-10"/>
            {dataBlog.map((item) => (
                <div key={item.id} className="text-3xl">
                    <h2>{item.title}</h2>
                    <p className="text-lg">{item.content}</p>
                    <button
                        onClick={() => handleShowData(item)} // ส่งข้อมูล blog ที่ถูกเลือกไปยัง handleShowData
                        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        อ่านเพิ่มเติม
                    </button>
                    <hr className="mt-10 mb-10" />
                </div>
            ))}

            {/* Modal Section */}
            {selectedBlog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <div className="bg-white p-8 rounded-lg w-2/3">
                        <h2 className="text-3xl mb-4">{selectedBlog.title}</h2>
                        <p className="text-lg mb-6">{selectedBlog.content}</p>
                        <button
                            onClick={handleCloseModal}
                            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                            ปิด
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
