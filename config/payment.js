const midtransClient = require('midtrans-client');

const snap = new midtransClient.Snap({
  isProduction: false, // false = Sandbox, true = Production
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

module.exports = snap;
