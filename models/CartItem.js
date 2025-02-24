const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Cart = require('./Cart');
const ProductVariant = require('./ProductVariant');

const CartItem = sequelize.define('CartItem', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  cartId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Cart,
      key: 'id'
    }
  },
  variantId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: ProductVariant,
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    validate: { min: 1 }
  }
});

// Relasi: CartItem milik satu Cart
CartItem.belongsTo(Cart, { foreignKey: 'cartId', onDelete: 'CASCADE' });
// Relasi: CartItem berhubungan dengan ProductVariant, bukan Product
CartItem.belongsTo(ProductVariant, { foreignKey: 'variantId', onDelete: 'CASCADE' });

module.exports = CartItem;
