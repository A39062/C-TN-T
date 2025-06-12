const db = require('../config/db');

// Lấy tất cả người dùng
const getAllUsers = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM users');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi truy vấn dữ liệu người dùng' });
    }
};

// Thêm người dùng mới
const createUser = async (req, res) => {
    const { name, email, password, phone, address, role } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO users (name, email, password, phone, address, role) VALUES (?, ?, ?, ?, ?, ?)',
            [name, email, password, phone, address, role]
        );
        res.status(201).json({ id: result.insertId, message: 'Thêm người dùng thành công' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi thêm người dùng' });
    }
};

// Cập nhật người dùng
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, phone, address, role } = req.body;
    try {
        await db.query(
            'UPDATE users SET name = ?, email = ?, password = ?, phone = ?, address = ?, role = ? WHERE id = ?',
            [name, email, password, phone, address, role, id]
        );
        res.json({ message: 'Cập nhật người dùng thành công' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi cập nhật người dùng' });
    }
};

// Xóa người dùng
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM users WHERE id = ?', [id]);
        res.json({ message: 'Xóa người dùng thành công' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi xóa người dùng' });
    }
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
};
