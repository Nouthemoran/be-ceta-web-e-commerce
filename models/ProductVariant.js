// const { DataTypes } = require('sequelize');

// const ProductVariant = sequelize.define('ProductVariant', {
//   id: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     primaryKey: true
//   },
//   size: {
//     type: DataTypes.STRING, // Contoh: "S", "M", "L", "36", "38-40"
//     allowNull: false
//   },
//   designName: {
//     type: DataTypes.STRING, // Contoh: "Merah", "#FF0000", "Navy Blue"
//     allowNull: false
//   },
//   designImageUrl: {
//     type: DataTypes.STRING, // Contoh: "Merah", "#FF0000", "Navy Blue"
//     allowNull: false
//   },
//   material: {
//     type: DataTypes.STRING, // Contoh: "Katun", "Sutra"
//     allowNull: true // Opsional
//   },
//   sku: {
//     type: DataTypes.STRING(50), // Contoh: "FLORAL-DRESS-RED-S"
//     unique: true
//   },
//   stock: {
//     type: DataTypes.INTEGER,
//     defaultValue: 0
//   },
//   price: {
//     type: DataTypes.DECIMAL(10, 2), // Contoh: 299000.00
//     allowNull: false
//   }
// });

// // Relasi ke Product (Many-to-One)
// ProductVariant.belongsTo(Product, { foreignKey: 'productId' });
// Product.hasMany(ProductVariant, { foreignKey: 'productId' });