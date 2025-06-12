const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',  // Để trống nếu bạn chưa đặt mật khẩu cho root trong XAMPP
    database: 'cellphones_clone',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
