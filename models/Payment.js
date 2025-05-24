import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Payment extends Model {}

  Payment.init(
    {
      id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      paymentMethod: { 
        type: DataTypes.STRING, 
        allowNull: false 
      },
      paymentStatus: { 
        type: DataTypes.STRING, 
        defaultValue: "pending" 
      },
      transactionId: { 
        type: DataTypes.STRING, 
        unique: true 
      },
      paymentUrl: { 
        type: DataTypes.STRING 
      },
    },
    {
      sequelize,
      modelName: 'Payment',
      tableName: 'payments',
      timestamps: true, // Sesuaikan jika perlu
    }
  );

  return Payment;
};
