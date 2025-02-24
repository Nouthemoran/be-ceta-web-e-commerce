const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User'); 

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
});

// Relasi: Cart milik satu User
Cart.belongsTo(User, { foreignKey: 'userId', as: 'user', onDelete: 'CASCADE' });

module.exports = Cart;
