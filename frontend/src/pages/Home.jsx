import React from 'react';
import Header from '../components/Header';
const Home = () => {
    return (
        <div>
            <Header />
            <main className="container mx-auto py-10 px-4">
                <h1 className="text-3xl font-bold mb-6">Chào mừng đến với Cellphones!</h1>
                <p className="text-gray-700">
                    Đây là trang chủ của bạn. Tại đây bạn có thể duyệt các sản phẩm mới nhất, xem giỏ hàng, hoặc quản lý tài khoản của mình.
                </p>

                {/* Phần hiển thị nội dung sản phẩm, banner... sau này bạn có thể thêm tại đây */}
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white rounded shadow p-4 text-center">
                        <h2 className="text-xl font-semibold mb-2">Sản phẩm 1</h2>
                        <p className="text-gray-600">Mô tả ngắn sản phẩm...</p>
                    </div>
                    <div className="bg-white rounded shadow p-4 text-center">
                        <h2 className="text-xl font-semibold mb-2">Sản phẩm 2</h2>
                        <p className="text-gray-600">Mô tả ngắn sản phẩm...</p>
                    </div>
                    <div className="bg-white rounded shadow p-4 text-center">
                        <h2 className="text-xl font-semibold mb-2">Sản phẩm 3</h2>
                        <p className="text-gray-600">Mô tả ngắn sản phẩm...</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
