const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class CartItem extends Model {}

  CartItem.init(
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
      variantId: {
        type: DataTypes.UUID, // Sesuaikan tipe datanya dengan ProductVariant
        allowNull: false, // Tidak boleh NULL
        references: {
          model: 'product_variants', // Sesuai nama tabel di database
          key: 'id',
        },
        onDelete: 'CASCADE', // Jika variant dihapus, cart item ikut terhapus
        onUpdate: 'CASCADE',
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
