const express = require('express');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');
const db = require('./config/db'); // để đảm bảo kết nối db
const protectedRoutes = require('./routes/protected');
const authRoutes = require('./routes/auth');
const app = express();
const userRoutes = require('./routes/users');

console.log('PORT =', process.env.PORT);
console.log('JWT_SECRET =', process.env.JWT_SECRET);

app.use(cors());
app.use(express.json());

app.use('/api/protected', protectedRoutes);
app.use('/api', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
});
