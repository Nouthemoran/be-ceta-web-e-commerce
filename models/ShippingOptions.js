import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class ShippingOption extends Model {}

  ShippingOption.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      courier: {
        type: DataTypes.STRING,
        allowNull: false, // e.g., 'JNE', 'J&T'
      },
      service: {
        type: DataTypes.STRING,
        allowNull: false, // e.g., 'REG', 'YES'
      },
      cost: {
        type: DataTypes.INTEGER,
        allowNull: false, // dalam Rupiah
      },
      etd: {
        type: DataTypes.STRING, // estimasi tiba
        allowNull: true,
      },
      orderId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'ShippingOption',
      tableName: 'shipping_options',
      timestamps: true,
    }
  );

  return ShippingOption;
};
