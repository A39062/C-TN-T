// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Gửi request đăng nhập
            const res = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            });

            const { user, token } = res.data;

            // Lưu token và user
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            // Gửi request kiểm tra token để test middleware (tuỳ chọn)
            const protectedUrl = user.role === 'admin'
                ? 'http://localhost:5000/api/protected/admin'
                : 'http://localhost:5000/api/protected/user';

            await axios.get(protectedUrl, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Chuyển hướng dựa vào role
            if (user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/home');
            }
        } catch (err) {
            alert(err.response?.data?.message || 'Đăng nhập thất bại');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4 text-center">Đăng nhập</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border px-3 py-2 rounded mb-3"
                    />
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border px-3 py-2 rounded mb-4"
                    />
                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
                    >
                        Đăng nhập
                    </button>
                </form>
                <p className="mt-4 text-center text-sm">
                    Chưa có tài khoản?{' '}
                    <Link to="/register" className="text-red-600 hover:underline">
                        Đăng ký
                    </Link>
                </p>
            </div>
        </div>
    );
};
const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    // Gửi sự kiện để thông báo cho các component khác (như Header) cập nhật lại
    window.dispatchEvent(new Event("storage"));

    // Điều hướng về trang chủ
    navigate('/home');
};
export default Login;
