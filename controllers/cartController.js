import { Cart, ProductVariant, CartItem } from '../models/Index.js';

// GET CART ITEMS (dengan detail variant)
const getCartItems = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({
      where: { userId },
      include: [
        {
          model: CartItem,
          as: 'cartItems', // Harus sama dengan alias di model
          include: [
            {
              model: ProductVariant,
              as: 'variant',
              attributes: ['id', 'size', 'designName', 'price', 'stock']
            }
          ]
        }
      ]
    });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ADD ITEM TO CART (menggunakan variant)
const addCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { variantId, quantity } = req.body;
    
    // Pastikan product variant ada
    const variant = await ProductVariant.findByPk(variantId);
    if (!variant) {
      return res.status(404).json({ message: 'Product variant not found' });
    }

    // Cari cart user. Jika belum ada, buat cart baru untuk user tersebut.
    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      cart = await Cart.create({ userId });
    }

    // Cek apakah item dengan variant yang sama sudah ada di cart, jika iya, update quantity
    let cartItem = await CartItem.findOne({
      where: { cartId: cart.id, variantId }
    });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await CartItem.create({
        cartId: cart.id,
        variantId,
        quantity,
      });
    }

    res.status(201).json({ message: 'Item added to cart', data: cartItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE CART ITEM (quantity)
const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params; // id CartItem
    const { quantity } = req.body;

    const cartItem = await CartItem.findByPk(id);
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json({ message: 'Cart item updated', data: cartItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE CART ITEM
const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params; // id CartItem

    const cartItem = await CartItem.findByPk(id);
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    await cartItem.destroy();

    res.status(200).json({ message: 'Cart item deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  getCartItems,
  addCartItem,
  updateCartItem,
  deleteCartItem,
};
