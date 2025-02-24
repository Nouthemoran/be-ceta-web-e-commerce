const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Order = require('./Order');

const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  orderId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Order,
      key: 'id',
    },
  },
  paymentMethod: {
    type: DataTypes.STRING, // Ex: 'bank_transfer', 'credit_card', 'ewallet'
    allowNull: false,
  },
  paymentStatus: {
    type: DataTypes.ENUM('pending', 'paid', 'failed', 'expired'),
    defaultValue: 'pending',
  },
  transactionId: {
    type: DataTypes.STRING, // ID dari Midtrans
    allowNull: false,
  },
  paymentUrl: {
    type: DataTypes.STRING, // Redirect URL buat bayar
    allowNull: true,
  }
});

// Relasi ke Order
Payment.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

module.exports = Payment;
