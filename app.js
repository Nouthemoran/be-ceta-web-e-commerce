import express from 'express';
import cors from 'cors';
import db from './models/Index.js';

// Import routes
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productVariantRoutes from './routes/variantRoutes.js';
import wishlistRoutes from './routes/wishlistRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import addressRoutes from './routes/addressRoutes.js';
import shippingOptionRoutes from './routes/shippingOptionRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
const port = process.env.PORT || 3001; // Or your desired port

// Middleware to parse JSON request bodies
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true, // Allow cookies and authorization headers
};
app.use(cors(corsOptions));

// Route definitions - Centralized for clarity
app.use('/api/auth', authRoutes);
app.use('/api/shipping-options', shippingOptionRoutes);
app.use('/api/address', addressRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/variant', productVariantRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/product', productRoutes);
app.use('/api/user', userRoutes);

// Database synchronization and server start
async function startServer() {
  try {
    await db.sequelize.authenticate();
    console.log('✅ Database Connected!');

    // Use { alter: false } in production, and { force: true } in development
    // to drop tables if they exist
    await db.sequelize.sync({ alter: false });
    console.log('✅ Database Synced!');

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error('❌ Error during server startup:', err);
  }
}

startServer();

export default app;
