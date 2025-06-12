import React, { useState, useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import UserManager from '../components/Admin/UserManager';
import ProductManager from '../components/Admin/ProductManager';
import OrderManager from '../components/Admin/OrderManager';

const tabs = [
    { key: 'users', label: 'Quản lý người dùng' },
    { key: 'products', label: 'Quản lý sản phẩm' },
    { key: 'orders', label: 'Quản lý đơn hàng' }
];

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('users');
    const tabRefs = useRef({});
    const navigate = useNavigate();

    const [underlineStyle, setUnderlineStyle] = useState({
        left: 0,
        width: 0,
    });

    useLayoutEffect(() => {
        const activeRef = tabRefs.current[activeTab];
        if (activeRef && activeRef.offsetParent) {
            const parentRect = activeRef.offsetParent.getBoundingClientRect();
            const rect = activeRef.getBoundingClientRect();
            setUnderlineStyle({
                left: rect.left - parentRect.left,
                width: rect.width,
            });
        }
    }, [activeTab]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');

        // Gửi sự kiện cho Header biết
        window.dispatchEvent(new Event('userChanged'));

        navigate('/home');
    };


    const renderContent = () => {
        switch (activeTab) {
            case 'users':
                return <UserManager />;
            case 'products':
                return <ProductManager />;
            case 'orders':
                return <OrderManager />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex justify-between items-center px-6 py-6">
                <h1 className="text-3xl font-bold text-gray-800">Trang Quản lý</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                    Đăng xuất
                </button>
            </div>

            {/* Header Tabs */}
            <div className="bg-white shadow p-4 relative">
                <div className="flex justify-center space-x-8 relative">
                    {tabs.map((tab) => (
                        <div
                            key={tab.key}
                            className="relative"
                            ref={(el) => (tabRefs.current[tab.key] = el)}
                        >
                            <button
                                onClick={() => setActiveTab(tab.key)}
                                className={`pb-2 px-1 text-gray-600 hover:text-blue-600 transition-all duration-300 ${activeTab === tab.key
                                    ? 'font-semibold text-blue-600'
                                    : ''
                                    }`}
                            >
                                {tab.label}
                            </button>
                            {activeTab === tab.key && (
                                <motion.div
                                    className="absolute bottom-0 left-0 h-[2px] bg-blue-500 rounded-full"
                                    layout
                                    initial={false}
                                    animate={{ width: '100%' }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Nội dung */}
            <div className="p-6">{renderContent()}</div>
        </div>
    );
};

export default AdminDashboard;
