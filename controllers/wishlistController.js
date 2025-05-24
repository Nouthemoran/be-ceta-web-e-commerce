import { Wishlist, Product } from '../models/Index';

const getAllWishlist = async (req, res) => {
  try {
    const userId = req.user.id;

    const wishlist = await Wishlist.findAll({
      where: { userId },
      include: [{ model: Product }],
    });

    res.status(200).json({
      success: true,
      message: 'Wishlist retrieved successfully',
      data: wishlist,
    });
  } catch (error) {
    console.error('Error getting wishlist:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve wishlist',
    });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    // Cek apakah sudah ada
    const existing = await Wishlist.findOne({
      where: { userId, productId },
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Product already in wishlist',
      });
    }

    const newWishlist = await Wishlist.create({
      userId,
      productId,
    });

    res.status(201).json({
      success: true,
      message: 'Product added to wishlist',
      data: newWishlist,
    });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add to wishlist',
    });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { wishlistId } = req.params;

    const deleted = await Wishlist.destroy({
      where: {
        id: wishlistId,
        userId,
      },
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Wishlist item not found or unauthorized',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Wishlist item removed successfully',
    });
  } catch (error) {
    console.error('Error removing wishlist item:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove wishlist item',
    });
  }
};

export default {
  getAllWishlist,
  addToWishlist,
  removeFromWishlist,
};
