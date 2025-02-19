const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User'); // Import User

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.STRING,
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
  totalPrice: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending', // pending, paid, shipped, cancelled
  },
  items: {
    type: DataTypes.TEXT, // Simpan JSON (produk yang dipesan)
    allowNull: false,
  },
});

// Relasi ke User
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = Order;
