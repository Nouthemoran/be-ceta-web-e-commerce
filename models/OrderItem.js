const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class OrderItem extends Model {}

  OrderItem.init(
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
      priceAtPurchase: { 
        type: DataTypes.FLOAT, 
        allowNull: false 
      },
    },
    {
      sequelize,
      modelName: 'OrderItem',
      tableName: 'order_items',
      timestamps: true, // Opsional, sesuaikan dengan kebutuhan
    }
  );

  return OrderItem;
};
