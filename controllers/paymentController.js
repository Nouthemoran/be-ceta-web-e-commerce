const createPayment = async (req, res) => {
    try {
      const { userId, customerName, customerEmail, productId, quantity } = req.body;
  
      let itemDetails = [];
      let grossAmount = 0;
  
      // 🛒 Checkout dari Cart
      if (!productId) {
        const cartItems = await Cart.findAll({
          where: { userId },
          include: [{ model: Product, as: 'product', attributes: ['id', 'name', 'price'] }]
        });
  
        if (cartItems.length === 0) {
          return res.status(400).json({ error: 'Keranjang kosong' });
        }
  
        itemDetails = cartItems.map(item => ({
          id: item.product.id.toString(),
          price: item.product.price,
          quantity: item.quantity,
          name: item.product.name,
        }));
  
        grossAmount = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      } else {
        // ⚡ "Beli Sekarang" langsung pakai productId
        const product = await Product.findByPk(productId);
  
        if (!product) {
          return res.status(404).json({ error: 'Produk tidak ditemukan' });
        }
  
        itemDetails.push({
          id: product.id.toString(),
          price: product.price,
          quantity: quantity || 1,
          name: product.name,
        });
  
        grossAmount = product.price * (quantity || 1);
      }
  
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
  
      const transaction = await snap.createTransaction(parameter);
  
      res.status(200).json({
        token: transaction.token,
        redirect_url: transaction.redirect_url,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  module.exports = { createPayment };
  