const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/Index'); // pastikan sesuai path model User kamu

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleAuthHandler = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: 'Token is required' });

    // Verifikasi token ke Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    // Cari user di database
    let user = await User.findOne({ email });
    if (!user) {
      // Buat user baru kalau belum ada
      user = await User.create({
        email,
        name,
        avatar: picture, // opsional
        role: 'customer', // default role kalau mau
      });
    }

    // Generate JWT internal kamu
    const jwtToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Kirim JWT ke frontend
    res.json({ jwt: jwtToken });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid Google token' });
  }
};
