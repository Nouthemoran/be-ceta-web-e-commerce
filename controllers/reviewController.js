const { Review, Product, User } = require('../models/Index');

// Buat review baru
const createReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const userId = req.user.id;

    // Cek apakah user sudah memberi review sebelumnya
    const existing = await Review.findOne({
      where: { userId, productId }
    });

    if (existing) {
      return res.status(400).json({ message: 'Kamu sudah memberikan review untuk produk ini.' });
    }

    const review = await Review.create({
      userId,
      productId,
      rating,
      comment,
    });

    res.status(201).json({
      message: 'Review berhasil ditambahkan.',
      data: review,
    });
  } catch (error) {
    console.error('Create Review Error:', error);
    res.status(500).json({ message: 'Gagal menambahkan review.' });
  }
};

// Ambil semua review untuk satu produk
const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.findAll({
      where: { productId },
      include: [{ model: User, attributes: ['id', 'name'] }],
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({ data: reviews });
  } catch (error) {
    console.error('Get Product Reviews Error:', error);
    res.status(500).json({ message: 'Gagal mengambil review.' });
  }
};

// Hapus review (hanya untuk pemilik review atau admin)
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;

    const review = await Review.findByPk(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review tidak ditemukan.' });
    }

    // Cek kepemilikan
    if (review.userId !== userId) {
      return res.status(403).json({ message: 'Kamu tidak bisa menghapus review ini.' });
    }

    await review.destroy();
    res.status(200).json({ message: 'Review berhasil dihapus.' });
  } catch (error) {
    console.error('Delete Review Error:', error);
    res.status(500).json({ message: 'Gagal menghapus review.' });
  }
};

module.exports = {
  createReview,
  getProductReviews,
  deleteReview,
};
