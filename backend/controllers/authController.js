const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { name, email, phone, address, password, role } = req.body;
    try {
        const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (rows.length) return res.status(400).json({ message: "Email đã tồn tại" });

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.query(
            "INSERT INTO users (name, email, phone, address, password, role) VALUES (?, ?, ?, ?, ?, ?)",
            [name, email, phone, address, hashedPassword, role || 'user']
        );

        res.status(201).json({ message: "Đăng ký thành công" });
    } catch (err) {
        console.error('Lỗi ở register:', err);
        res.status(500).json({ message: "Lỗi server", error: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        const user = rows[0];
        if (!user) return res.status(404).json({ message: "Email không tồn tại" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Sai mật khẩu" });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({
            message: "Đăng nhập thành công",
            user: {
                id: user.id,
                name: user.name,
                role: user.role
            },
            token
        });
    } catch (err) {
        console.error('Lỗi ở login:', err);
        res.status(500).json({ message: "Lỗi server", error: err.message });
    }
};

