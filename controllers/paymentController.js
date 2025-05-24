import { Cart, CartItem, ProductVariant } from '../models/Index';
// Pastikan objek snap telah diinisialisasi dari midtrans-client atau sesuai implementasi kamu
import { createTransaction } from '../utils/snap'; 
// Contoh: const snap = new midtransClient.Snap({ isProduction: false, serverKey: process.env.MIDTRANS_SERVER_KEY });

const createPayment = async (req, res) => {
  try {
    // Gunakan variantId untuk "Buy Now", jika tidak ada berarti checkout dari cart
    const { userId, customerName, customerEmail, variantId, quantity } = req.body;

    let itemDetails = [];
    let grossAmount = 0;

    // 🛒 Checkout dari Cart
    if (!variantId) {
      // Cari cart user beserta cartItems dan detail variant-nya
      const cart = await Cart.findOne({
        where: { userId },
        include: [
          {
            model: CartItem,
            as: 'cartItems',
            include: [
              {
                model: ProductVariant,
                as: 'variant',
                attributes: ['id', 'designName', 'price']
              }
            ]
          }
        ]
      });

      if (!cart || !cart.cartItems.length) {
        return res.status(400).json({ error: 'Keranjang kosong' });
      }

      itemDetails = cart.cartItems.map(item => ({
        id: item.variant.id.toString(),
        price: item.variant.price,
        quantity: item.quantity,
        name: item.variant.designName,
      }));

      grossAmount = cart.cartItems.reduce(
        (total, item) => total + (item.variant.price * item.quantity),
        0
      );
    } else {
      // ⚡ "Buy Now" langsung pakai variantId
      const variant = await ProductVariant.findByPk(variantId);
      if (!variant) {
        return res.status(404).json({ error: 'Produk variant tidak ditemukan' });
      }

      itemDetails.push({
        id: variant.id.toString(),
        price: variant.price,
        quantity: quantity || 1,
        name: variant.designName,
      });

      grossAmount = variant.price * (quantity || 1);
    }

    // Buat order id untuk keperluan transaksi payment
    const orderId = `ORDER-${Date.now()}`;

    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: grossAmount,
      },
      item_details: itemDetails,
      customer_details: {
        first_name: customerName,
        email: customerEmail,
      },
    };

    const transaction = await createTransaction(parameter);

    res.status(200).json({
      token: transaction.token,
      redirect_url: transaction.redirect_url,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default { createPayment };
