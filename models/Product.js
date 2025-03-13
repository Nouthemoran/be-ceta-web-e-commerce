const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Product extends Model {
    // Jika diperlukan, tambahkan method instance atau static di sini
  }

  Product.init(
    {
      id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      name: { 
        type: DataTypes.STRING, 
        allowNull: false 
      },
      description: { 
        type: DataTypes.TEXT 
      },
      imageUrl: { 
        type: DataTypes.STRING 
      },
    },
    {
      sequelize,
      modelName: 'Product',
      tableName: 'products', // opsional, bisa disesuaikan dengan nama tabel di DB
      timestamps: true,
    }
  );

  return Product;
};
