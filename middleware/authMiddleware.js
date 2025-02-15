const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Akses ditolak, token tidak ada' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    req.user = user; // Biar di controller tinggal akses req.user
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token tidak valid', error: error.message });
  }
};

module.exports = { authMiddleware };
