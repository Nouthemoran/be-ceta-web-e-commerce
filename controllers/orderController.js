const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const ProductVariant = require('../models/ProductVariant');
const { generateOrderId } = require('../utils/generateCustomId');

// 1️⃣ Checkout dari Cart (Semua Barang di Keranjang)
const checkoutFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const customOrderId = generateOrderId();

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
              attributes: ['id', 'designName', 'price', 'stock'] // sesuaikan jika perlu
            }
          ]
        }
      ]
    });

    if (!cart || !cart.cartItems.length) {
      return res.status(400).json({ message: 'Keranjang kosong!' });
    }

    let totalPrice = 0;

    // Validasi stok dan hitung total harga
    for (const item of cart.cartItems) {
      const variant = item.variant;
      const quantity = item.quantity;

      if (quantity > variant.stock) {
        return res.status(400).json({
          message: `Stok produk variant ${variant.designName} tidak tersedia!`
        });
      }
      totalPrice += variant.price * quantity;
    }

    // Buat order baru
    const order = await Order.create({
      id: customOrderId,
      userId,
      totalPrice,
      status: 'pending'
    });

    // Buat entri OrderItem untuk tiap item di keranjang dan kurangi stok variant
    for (const item of cart.cartItems) {
      const variant = item.variant;
      const quantity = item.quantity;

      await OrderItem.create({
        orderId: order.id,
        variantId: variant.id,
        quantity,
        priceAtPurchase: variant.price
      });

      // Kurangi stok variant
      variant.stock -= quantity;
      await variant.save();
    }

    // Hapus semua item di keranjang setelah checkout
    await CartItem.destroy({ where: { cartId: cart.id } });

    res.status(201).json({ message: 'Order berhasil dibuat', data: order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2️⃣ Buy Now (Langsung Checkout tanpa Cart)
const buyNow = async (req, res) => {
  try {
    const userId = req.user.id;
    const { variantId, quantity } = req.body;
    const customOrderId = generateOrderId();

    // Cari produk variant berdasarkan variantId
    const variant = await ProductVariant.findByPk(variantId);
    if (!variant) {
      return res.status(404).json({ message: 'Produk variant tidak ditemukan!' });
    }

    if (quantity > variant.stock) {
      return res.status(400).json({ message: 'Stok tidak tersedia!' });
    }

    const totalPrice = variant.price * quantity;

    // Buat order baru
    const order = await Order.create({
      id: customOrderId,
      userId,
      totalPrice,
      status: 'pending'
    });

    // Buat order item untuk pesanan langsung
    await OrderItem.create({
      orderId: order.id,
      variantId: variant.id,
      quantity,
      priceAtPurchase: variant.price
    });

    // Kurangi stok produk variant
    variant.stock -= quantity;
    await variant.save();

    res.status(201).json({ message: 'Order berhasil dibuat', data: order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3️⃣ Get Orders (Riwayat Pesanan User)
const getOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: OrderItem,
          as: 'orderItems',
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
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  checkoutFromCart,
  buyNow,
  getOrders,
};
