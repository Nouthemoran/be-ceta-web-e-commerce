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
  CartItem.belongsTo(ProductVariant, { foreignKey: 'variantId', as: 'variant' }); // Tambahkan alias
  
  // User ↔ Order
  User.hasMany(Order, { foreignKey: 'userId' });
  Order.belongsTo(User, { foreignKey: 'userId' });

  // Order ↔ OrderItem
  Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'orderItems' });
  OrderItem.belongsTo(Order, { foreignKey: 'orderId', as: 'order' }); // Tambahkan alias juga  

  // ProductVariant ↔ OrderItem
  ProductVariant.hasMany(OrderItem, { foreignKey: 'variantId', as: 'orderItems' });
  OrderItem.belongsTo(ProductVariant, { foreignKey: 'variantId', as: 'variant' }); // Tambahkan alias  

  // Order ↔ Payment
  Order.hasOne(Payment, { foreignKey: 'orderId' });
  Payment.belongsTo(Order, { foreignKey: 'orderId' });

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
  };

  module.exports = db;
