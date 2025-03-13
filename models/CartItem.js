const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class CartItem extends Model {}

  CartItem.init(
    {
      id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      quantity: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        defaultValue: 1 
      },
    },
    {
      sequelize,
      modelName: 'CartItem',
      tableName: 'cart_items',
      timestamps: true, // Optional, sesuai kebutuhan
    }
  );

  return CartItem;
};
