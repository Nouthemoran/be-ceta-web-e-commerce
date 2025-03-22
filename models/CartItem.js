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
      variantId: {
        type: DataTypes.INTEGER, // Sesuaikan tipe datanya
        allowNull: false, // Tidak boleh NULL
        references: {
          model: 'product_variants', // Sesuai nama tabel di database
          key: 'id',
        },
        onDelete: 'CASCADE', // Jika kategori dihapus, produk ikut terhapus
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
