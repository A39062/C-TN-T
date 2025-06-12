import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Xóa token và user
        localStorage.removeItem('user');
        localStorage.removeItem('token');

        // Thông báo cho các component khác cập nhật lại trạng thái
        window.dispatchEvent(new Event("userChanged"));

        // Điều hướng về trang chủ
        navigate('/home');
    }, [navigate]);

    return null; // Không cần render gì cả
};

export default Logout;
