const crypto = require('crypto');

// Generate Random String
const generateRandomString = (length = 8) => {
  return crypto.randomBytes(length).toString('hex').slice(0, length).toUpperCase();
};

// Generate Custom ID dengan Prefix
const generateCustomId = (prefix = '', length = 8) => {
  const randomPart = generateRandomString(length);
  return `${prefix}-${randomPart}`;
};

// Generate Custom Order ID (Misalnya dengan Tanggal)
const generateOrderId = () => {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, ''); // 20240214
  const randomPart = generateRandomString(5);
  return `ORDER-${datePart}-${randomPart}`;
};

// Generate Custom Invoice ID
const generateInvoiceId = (number = '000001') => {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  return `INV-${datePart}-${number}`;
};

module.exports = {
  generateRandomString,
  generateCustomId,
  generateOrderId,
  generateInvoiceId,
};
