import { Snap } from 'midtrans-client';

const snap = new Snap({
  isProduction: false, // false = Sandbox, true = Production
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

export default snap;
