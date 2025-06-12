// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware: Kiểm tra token có hợp lệ không
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
    if (!token) return res.status(401).json({ message: 'Không có token, từ chối truy cập' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // lưu thông tin user vào req
        next();
    } catch (err) {
        res.status(403).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
    }
};

// Middleware: Kiểm tra user có phải admin không
const isAdmin = (req, res, next) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Bạn không có quyền truy cập (admin)' });
    }
    next();
};

module.exports = { verifyToken, isAdmin };
