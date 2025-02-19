const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Product = require('./Product');
const User = require('./User'); // Import User

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.CHAR(36).BINARY, // SESUAIKAN dengan Users.id
    defaultValue: DataTypes.UUIDV4, // generate UUID otomatis
    primaryKey:true
  },
  userId: {
    type: DataTypes.CHAR(36).BINARY, // SESUAIKAN dengan Users.id
    allowNull: false,
    references: {
      model: User, // Relasi ke User
      key: 'id',
    },
  },
  productId: {
    type: DataTypes.STRING(255),
    allowNull: false,
    references: {
      model: Product, // Relasi ke Product
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

// Bikin relasi antara Cart -> Product
Cart.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

// Bikin relasi antara Cart -> User
Cart.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = Cart;
