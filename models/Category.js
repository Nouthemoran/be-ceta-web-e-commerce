
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {}

  Category.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT },
    },
    {
      sequelize,
      modelName: 'Category',
      tableName: 'categories',
    }
  );

  return Category;
};
