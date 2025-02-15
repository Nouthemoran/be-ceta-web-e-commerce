const express = require('express');
const sequelize = require('./config/db');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();
app.use(express.json());

// main routes
app.use('/api/cart', cartRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Cek koneksi DB
sequelize
  .authenticate()
  .then(() => {
    console.log('✅ Database Connected!');

    // Sync semua model ke database
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log('✅ Database Synced!');
  })
  .catch((err) => {
    console.error('❌ Error:', err);
  });

module.exports = app;
