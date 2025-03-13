const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Cart extends Model {}

  Cart.init(
    {
      id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
    },
    {
      sequelize,
      modelName: 'Cart',
      tableName: 'carts',
      timestamps: true, // Optional, sesuaikan kebutuhan
    }
  );

  return Cart;
};
