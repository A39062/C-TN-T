import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const loadUser = () => {
            const storedUser = localStorage.getItem('user');
            setUser(storedUser ? JSON.parse(storedUser) : null);
        };

        loadUser(); // lần đầu load

        const handleUserChange = () => {
            loadUser(); // cập nhật khi có sự kiện
        };

        window.addEventListener('userChanged', handleUserChange);

        return () => {
            window.removeEventListener('userChanged', handleUserChange);
        };
    }, []);


    // Bắt sự kiện click ra ngoài dropdown để đóng dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownOpen(false);
            }
        };

        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownOpen]);



    if (!user) {
        return (
            <header className="bg-red-600 shadow-md">
                <div className="container mx-auto flex items-center justify-between p-4">
                    <div className="text-2xl font-bold text-white cursor-pointer">Cellphones</div>

                    <div className="flex flex-1 mx-4">
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm..."
                            className="flex-grow border border-white rounded-l px-4 py-2 focus:outline-none text-black"
                        />
                        <button className="bg-white text-red-600 px-4 rounded-r hover:bg-gray-200">Tìm</button>
                    </div>

                    <div className="flex items-center space-x-4 text-white">
                        <button className="relative hover:text-gray-300">
                            Giỏ hàng
                            <span className="absolute -top-2 -right-2 bg-red-800 text-white rounded-full text-xs px-1">0</span>
                        </button>
                        <button onClick={() => navigate('/login')} className="hover:text-gray-300">
                            Đăng nhập
                        </button>
                    </div>
                </div>
            </header>
        );
    }

    return (
        <header className="bg-red-600 shadow-md">
            <div className="container mx-auto flex items-center justify-between p-4">
                <div className="text-2xl font-bold text-white cursor-pointer">Cellphones</div>

                <div className="flex flex-1 mx-4">
                    <input
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
                        className="flex-grow border border-white rounded-l px-4 py-2 focus:outline-none text-black"
                    />
                    <button className="bg-white text-red-600 px-4 rounded-r hover:bg-gray-200">Tìm</button>
                </div>

                <div className="flex items-center space-x-4 text-white relative">
                    <button className="relative hover:text-gray-300">
                        Giỏ hàng
                        <span className="absolute -top-2 -right-2 bg-red-800 text-white rounded-full text-xs px-1">0</span>
                    </button>

                    <div
                        className="flex flex-col items-center cursor-pointer select-none relative"
                        ref={dropdownRef}
                    >
                        {/* Click để mở dropdown */}
                        <div
                            className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-red-600 font-bold text-lg"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <span className="text-sm mt-1">{user.name}</span>

                        {dropdownOpen && (
                            <div className="absolute top-full mt-2 right-0 w-48 bg-white text-black rounded shadow-lg z-10">
                                <div className="p-3 border-b border-gray-200">
                                    <p className="font-semibold mb-1">Thông báo</p>
                                    <p className="text-xs text-gray-600">Bạn chưa có thông báo mới.</p>
                                </div>
                                <button
                                    onClick={() => navigate('/logout')}
                                    className="w-full text-left px-3 py-2 hover:bg-red-600 hover:text-white rounded-b"
                                >
                                    Đăng xuất
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header >
    );
};

export default Header;
