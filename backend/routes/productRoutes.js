const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/products', (req, res) => {
    const { name, price, description, image } = req.body;
    const sql = 'INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, price, description, image], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Lỗi khi thêm sản phẩm' });
        }
        res.json({ message: 'Thêm sản phẩm thành công' });
    });
});

module.exports = router;
