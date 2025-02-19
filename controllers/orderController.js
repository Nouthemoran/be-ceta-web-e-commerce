const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { generateOrderId } = require('../utils/generateCustomId');

// 1️⃣ Checkout dari Cart (Semua Barang di Keranjang)
const checkoutFromCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const customOrderId = generateOrderId();

    const cartItems = await Cart.findAll({
      where: { userId },
      include: [{ model: Product, as: 'product' }],
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Keranjang kosong!' });
    }

    let totalPrice = 0;
    const orderItems = [];

    for (const item of cartItems) {
      const { product, quantity } = item;
      if (quantity > product.stock) {
        return res.status(400).json({
          message: `Stok produk ${product.name} tidak tersedia!`,
        });
      }

      totalPrice += product.price * quantity;
      orderItems.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
      });

      // Kurangi stok produk
      product.stock -= quantity;
      await product.save();
    }

    // Buat order baru dengan customOrderId
    const order = await Order.create({
      id: customOrderId, // <-- Ini masukin customOrderId
      userId,
      totalPrice,
      items: JSON.stringify(orderItems),
    });

    // Kosongin keranjang user setelah checkout
    await Cart.destroy({ where: { userId } });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2️⃣ Buy Now (Langsung Checkout tanpa Cart)
const buyNow = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    const customOrderId = generateOrderId();

    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: 'Produk tidak ditemukan!' });
    }

    if (quantity > product.stock) {
      return res.status(400).json({ message: 'Stok tidak tersedia!' });
    }

    const totalPrice = product.price * quantity;

    const order = await Order.create({
      id: customOrderId, // <-- Ini masukin customOrderId
      userId,
      totalPrice,
      items: JSON.stringify([
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity,
        },
      ]),
    });

    // Kurangi stok produk
    product.stock -= quantity;
    await product.save();

    res.status(201).json(order);
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
