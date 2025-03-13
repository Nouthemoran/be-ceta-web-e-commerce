const express = require('express');
const db = require('./models/index'); 

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(express.json());

// main routes
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Cek koneksi DB
db.sequelize.authenticate()
  .then(() => {
    console.log('✅ Database Connected!');
    // Sync semua model ke database
    return db.sequelize.sync({ alter: false });
  })
  .then(() => {
    console.log('✅ Database Synced!');
  })
  .catch((err) => {
    console.error('❌ Error:', err);
  });

module.exports = app;
