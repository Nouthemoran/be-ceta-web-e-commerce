const express = require('express');
const db = require('./models/Index'); 

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productVariantRoutes = require('./routes/variantRoutes');

const app = express();
app.use(express.json());

// main routes
app.use('/api/variant', productVariantRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/product', productRoutes);
app.use('/api/user', userRoutes);

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
