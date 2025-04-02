const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class OrderItem extends Model {}

  OrderItem.init(
    {
      id: { 
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true 
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
      orderId: {
        type: DataTypes.UUID, // Sesuaikan dengan Order
        allowNull: false,
        references: {
          model: 'orders', // Sesuai nama tabel di database
          key: 'id',
        },
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE',
      },
      variantId: {
        type: DataTypes.UUID, // Sesuaikan dengan ProductVariant
        allowNull: false,
        references: {
          model: 'product_variants', // Sesuai nama tabel di database
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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
