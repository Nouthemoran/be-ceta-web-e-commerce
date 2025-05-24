import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Cart extends Model {}

  Cart.init(
    {
      id: { 
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true 
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
