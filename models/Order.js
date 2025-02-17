const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Order = sequelize.define('Order', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
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

module.exports = Order;
