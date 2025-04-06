const { Coupon } = require('../models/Index');

// CREATE COUPON
const createCoupon = async (req, res) => {
  try {
    const { code, discountPercentage, expiredAt } = req.body;

    const existing = await Coupon.findOne({ where: { code } });
    if (existing) {
      return res.status(400).json({ message: 'Kode kupon sudah digunakan.' });
    }

    const coupon = await Coupon.create({
      code,
      discountPercentage,
      expiredAt,
    });

    res.status(201).json({ message: 'Kupon berhasil dibuat', data: coupon });
  } catch (error) {
    res.status(500).json({ message: 'Gagal membuat kupon', error: error.message });
  }
};

// GET ALL COUPONS
const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.findAll();
    res.status(200).json({ data: coupons });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil kupon', error: error.message });
  }
};

// VALIDATE COUPON (apply saat checkout)
const validateCoupon = async (req, res) => {
  try {
    const { code } = req.body;

    const coupon = await Coupon.findOne({ where: { code } });

    if (!coupon) {
      return res.status(404).json({ message: 'Kupon tidak ditemukan.' });
    }

    if (new Date() > new Date(coupon.expiredAt)) {
      return res.status(400).json({ message: 'Kupon sudah kedaluwarsa.' });
    }

    res.status(200).json({ message: 'Kupon valid', data: coupon });
  } catch (error) {
    res.status(500).json({ message: 'Gagal memvalidasi kupon', error: error.message });
  }
};

module.exports = {
  createCoupon,
  getCoupons,
  validateCoupon,
};
