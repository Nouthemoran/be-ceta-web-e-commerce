const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define(
  'Product',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Product;
