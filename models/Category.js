const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Category extends Model {}

  Category.init(
    {
      id: { 
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true 
      },
      name: { 
        type: DataTypes.STRING, 
        allowNull: false 
      },
      description: { 
        type: DataTypes.TEXT 
      },
    },
    {
      sequelize,
      modelName: 'Category',
      tableName: 'categories',
    }
  );

  return Category;
};
