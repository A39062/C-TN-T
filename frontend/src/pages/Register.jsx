import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // dùng để chuyển trang
import { motion, AnimatePresence } from 'framer-motion';

const EyeIcon = ({ isVisible }) => (
    <AnimatePresence mode="wait">
        {isVisible ? (
            <motion.svg
                key="eye"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12s3.75-6.75 9.75-6.75 9.75 6.75 9.75 6.75-3.75 6.75-9.75 6.75S2.25 12 2.25 12z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
            </motion.svg>
        ) : (
            <motion.svg
                key="eye-off"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.477 10.477a3 3 0 004.243 4.243"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.414 6.414C4.125 7.985 2.772 10.207 2.25 12c.522 1.793 1.875 4.015 4.164 5.586C8.703 19.157 10.944 19.5 12 19.5s3.297-.343 5.586-1.914c.81-.613 1.534-1.39 2.121-2.121"
                />
            </motion.svg>
        )}
    </AnimatePresence>
);

const Register = () => {
    const navigate = useNavigate();

    // State cho các input
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        confirmPassword: '',
    });

    // Hiện/ẩn mật khẩu
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // State thông báo lỗi/thành công
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Hàm cập nhật form data khi người dùng nhập
    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Hàm xử lý submit form đăng ký
    const handleRegister = async () => {
        setError('');
        setMessage('');

        if (formData.password !== formData.confirmPassword) {
            setError('Mật khẩu và nhập lại mật khẩu không khớp');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    password: formData.password,
                    role: 'user', // hoặc 'admin' nếu bạn muốn
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Đăng ký thất bại');
            } else {
                setMessage('Đăng ký thành công!');
                // Chuyển trang sau 2 giây
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            }
        } catch (err) {
            setError('Lỗi mạng hoặc server');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4 text-center">Đăng ký</h2>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Thông tin cá nhân</h3>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Họ tên"
                        className="w-full border px-3 py-2 rounded mb-3"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full border px-3 py-2 rounded mb-3"
                    />
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Số điện thoại"
                        className="w-full border px-3 py-2 rounded mb-3"
                    />
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Địa chỉ"
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Tạo mật khẩu</h3>

                    <div className="relative mb-3">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Mật khẩu"
                            className="w-full border px-3 py-2 rounded pr-10"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label="Toggle password visibility"
                        >
                            <EyeIcon isVisible={showPassword} />
                        </button>
                    </div>

                    <div className="relative">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Nhập lại mật khẩu"
                            className="w-full border px-3 py-2 rounded pr-10"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            aria-label="Toggle confirm password visibility"
                        >
                            <EyeIcon isVisible={showConfirmPassword} />
                        </button>
                    </div>
                </div>

                {/* Thông báo lỗi hoặc thành công */}
                {error && <div className="mb-3 text-red-600">{error}</div>}
                {message && <div className="mb-3 text-green-600">{message}</div>}

                <button
                    className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
                    onClick={handleRegister}
                >
                    Đăng ký
                </button>
            </div>
        </div>
    );
};

export default Register;
