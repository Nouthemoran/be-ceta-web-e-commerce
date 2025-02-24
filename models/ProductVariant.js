const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Product = require('./Product');

const ProductVariant = sequelize.define('ProductVariant', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Product,
      key: 'id'
    }
  },
  size: {
    type: DataTypes.STRING,
    allowNull: false
  },
  designName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  designImageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  material: {
    type: DataTypes.STRING,
    allowNull: true
  },
  sku: {
    type: DataTypes.STRING(50),
    unique: true
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  isDefault: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  weight: {
    type: DataTypes.FLOAT,
    defaultValue: 0.5
  }
});

// Relasi: Product memiliki banyak varian
ProductVariant.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

// Tambah relasi ke ProductVariant
Product.hasMany(ProductVariant, { foreignKey: 'productId' });

module.exports = ProductVariant;
