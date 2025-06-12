const db = require('../config/db');

// GET all products
exports.getProducts = (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

// POST a product
exports.createProduct = (req, res) => {
    const { name, price, image_url, description } = req.body;
    const sql = 'INSERT INTO products (name, price, image_url, description) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, price, image_url, description], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ id: result.insertId, name, price, image_url, description });
    });
};
