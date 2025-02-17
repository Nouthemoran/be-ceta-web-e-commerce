const Cart = require('../models/Cart');
const Product = require('../models/Product');  

const getCartItems = async (req, res) => {
  try {
    const userId = req.user.id;

    const cartItems = await Cart.findAll({
      where: { userId },
      include: [
        { model: Product, as: 'product', attributes: ['id', 'name', 'price'] }
      ]
    });

    res.status(200).json(cartItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
  
// 2️⃣ POST Add Item to Cart
const addCartItem = async (req, res) => {
    try {
      const userId = req.user.id;
      const { productId, quantity } = req.body;
  
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product tidak ditemukan' });
      }
  
      const newItem = await Cart.create({
        userId,
        productId,
        quantity
      });
  
      res.status(201).json({ message: 'Item berhasil ditambahkan', data: newItem });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
// 3️⃣ PUT Update Cart Item (Quantity)
const updateCartItem = async (req, res) => {
    try {
      const { id } = req.params;
      const { quantity } = req.body;
  
      const cartItem = await Cart.findByPk(id);
      if (!cartItem) {
        return res.status(404).json({ message: 'Item di keranjang tidak ditemukan' });
      }
  
      cartItem.quantity = quantity;
      await cartItem.save();
  
      res.status(200).json({ message: 'Item berhasil diperbarui', data: cartItem });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

// 4️⃣ DELETE Cart Item
const deleteCartItem = async (req, res) => {
    try {
      const { id } = req.params;
  
      const cartItem = await Cart.findByPk(id);
      if (!cartItem) {
        return res.status(404).json({ message: 'Item di keranjang tidak ditemukan' });
      }
  
      await cartItem.destroy();
  
      res.status(200).json({ message: 'Item berhasil dihapus' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

module.exports = { getCartItems, addCartItem, updateCartItem, deleteCartItem };
