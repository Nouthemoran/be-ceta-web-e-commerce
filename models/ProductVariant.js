const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class ProductVariant extends Model {}

  ProductVariant.init(
    {
      id: { 
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true 
      },
      size: { 
        type: DataTypes.STRING 
      },
      designName: { 
        type: DataTypes.STRING 
      },
      designImageUrl: { 
        type: DataTypes.STRING 
      },
      material: { 
        type: DataTypes.STRING 
      },
      sku: { 
        type: DataTypes.STRING, 
        unique: true 
      },
      stock: { 
        type: DataTypes.INTEGER, 
        defaultValue: 0 
      },
      price: { 
        type: DataTypes.FLOAT, 
        allowNull: false 
      },
      isDefault: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: false 
      },
      weight: { 
        type: DataTypes.FLOAT 
      },
      productId: {
        type: DataTypes.UUID, // Ubah jadi UUID
        allowNull: false, 
        references: {
          model: 'products', // Sesuai nama tabel di database
          key: 'id',
        },
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'ProductVariant',
      tableName: 'product_variants',
      timestamps: true,
    }
  );

  return ProductVariant;
};
