import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

// Import model-model yang sudah kamu buat dengan import ES6
import User from './User.js';
import Category from './Category.js';
import Product from './Product.js';
import ProductVariant from './ProductVariant.js';
import Cart from './Cart.js';
import CartItem from './CartItem.js';
import Order from './Order.js';
import OrderItem from './OrderItem.js';
import Payment from './Payment.js';
import Wishlist from './Wishlist.js';
import Review from './Review.js';
import Address from './Address.js';
import Coupon from './Coupon.js';
import ShippingOptions from './ShippingOptions.js';

// Atur relasi antar model
// Category ↔ Product
Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

// Product ↔ ProductVariant
Product.hasMany(ProductVariant, { foreignKey: 'productId' });
ProductVariant.belongsTo(Product, { foreignKey: 'productId' });

// User ↔ Cart
User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

// Cart ↔ CartItem
Cart.hasMany(CartItem, { foreignKey: 'cartId', as: 'cartItems' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId', as: 'cart' });

// ProductVariant ↔ CartItem
ProductVariant.hasMany(CartItem, { foreignKey: 'variantId', as: 'cartItems' });
CartItem.belongsTo(ProductVariant, { foreignKey: 'variantId', as: 'variant' });

// User ↔ Order
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

// Order ↔ OrderItem
Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'orderItems' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

// ProductVariant ↔ OrderItem
ProductVariant.hasMany(OrderItem, { foreignKey: 'variantId', as: 'orderItems' });
OrderItem.belongsTo(ProductVariant, { foreignKey: 'variantId', as: 'variant' });

// Order ↔ Payment
Order.hasOne(Payment, { foreignKey: 'orderId' });
Payment.belongsTo(Order, { foreignKey: 'orderId' });

// User ↔ Wishlist ↔ Product
User.hasMany(Wishlist, { foreignKey: 'userId' });
Wishlist.belongsTo(User, { foreignKey: 'userId' });

Product.hasMany(Wishlist, { foreignKey: 'productId' });
Wishlist.belongsTo(Product, { foreignKey: 'productId' });

// Relasi User ↔ Review
User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

// Relasi Product ↔ Review
Product.hasMany(Review, { foreignKey: 'productId' });
Review.belongsTo(Product, { foreignKey: 'productId' });

// Relasi User ↔ Address
User.hasMany(Address, { foreignKey: 'userId', as: 'addresses' });
Address.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Relasi Coupon ↔ Order 
Coupon.hasMany(Order, { foreignKey: 'couponId' });
Order.belongsTo(Coupon, { foreignKey: 'couponId' });

// Relasi Order ↔ Shipping
Order.hasOne(ShippingOptions, { foreignKey: 'orderId' });
ShippingOptions.belongsTo(Order, { foreignKey: 'orderId' });

const db = {
  DataTypes,
  sequelize,
  User,
  Category,
  Product,
  ProductVariant,
  Cart,
  CartItem,
  Order,
  OrderItem,
  Payment,
  Wishlist,
  Review,
  Address,
  Coupon,
  ShippingOptions,
};

export default db;
