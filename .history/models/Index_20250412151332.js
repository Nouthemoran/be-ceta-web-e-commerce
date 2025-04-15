const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Import model-model yang sudah kamu buat
const User = require('./User')(sequelize, DataTypes);
const Category = require('./Category')(sequelize, DataTypes);
const Product = require('./Product')(sequelize, DataTypes);
const ProductVariant = require('./ProductVariant')(sequelize, DataTypes);
const Cart = require('./Cart')(sequelize, DataTypes);
const CartItem = require('./CartItem')(sequelize, DataTypes);
const Order = require('./Order')(sequelize, DataTypes);
const OrderItem = require('./OrderItem')(sequelize, DataTypes);
const Payment = require('./Payment')(sequelize, DataTypes);
const Wishlist = require('./Wishlist')(sequelize, DataTypes); // ✅ Tambahan
const Review = require('./Review')(sequelize, DataTypes);
const Address = require('./Address')(sequelize, DataTypes);
const Coupon = require('./Coupon')(sequelize, DataTypes);
const ShippingMethod = require('./ShippingMethod')(sequelize, DataTypes);
const ShippingOption = require('./ShippingOption')(sequelize, DataTypes);

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

// ✅ User ↔ Wishlist ↔ Product
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
Order.hasOne(ShippingOption, { foreignKey: 'orderId' });
ShippingOption.belongsTo(Order, { foreignKey: 'orderId' });

const db = {
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
  Wishlist, // ✅ Tambahan
  Review,
  Address, // ← Tambahkan ini
  Coupon, // ← Tambahan
  ShippingMethod, // ← Tambahan
};

module.exports = db;
