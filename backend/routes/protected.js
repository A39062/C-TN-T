// routes/protected.js
const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// Route chỉ user đăng nhập mới truy cập được
router.get('/user', verifyToken, (req, res) => {
    res.json({ message: `Xin chào ${req.user.role}`, user: req.user });
});

// Route chỉ admin mới truy cập được
router.get('/admin', verifyToken, isAdmin, (req, res) => {
    res.json({ message: 'Chào mừng admin!', user: req.user });
});

module.exports = router;
