import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Order extends Model {}

  Order.init(
    {
      id: { 
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true 
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
