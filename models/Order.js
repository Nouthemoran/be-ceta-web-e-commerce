const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Order extends Model {}

  Order.init(
    {
      id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      totalPrice: { 
        type: DataTypes.FLOAT, 
        allowNull: false 
      },
      status: { 
        type: DataTypes.STRING, 
        defaultValue: "pending" 
      },
    },
    {
      sequelize,
      modelName: 'Order',
      tableName: 'orders',
      timestamps: true, // sesuaikan jika diperlukan
    }
  );

  return Order;
};
