const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Category = require('../models/Category');
const ProductVariant = require('../models/ProductVariant');

const Product = sequelize.define(
  'Product',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryId: { // Foreign Key ke Category
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Category,
        key: 'id'
      }
    },  
    description: {
      type: DataTypes.TEXT,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
    story: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // : {
    //   type: DataTypes.STRING,
    // },
    },
    {
    timestamps: true,
  }
);

// Relasi Product -> Category (Many-to-One)
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

// Relasi Category -> Products (One-to-Many)
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });


module.exports = Product;