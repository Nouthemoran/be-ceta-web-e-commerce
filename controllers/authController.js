import { OAuth2Client } from 'google-auth-library';
import { sign } from 'jsonwebtoken';
import { findOne, create } from '../models/Index'; // pastikan sesuai path model User kamu

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function googleAuthHandler(req, res) {
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
    let user = await findOne({ email });
    if (!user) {
      // Buat user baru kalau belum ada
      user = await create({
        email,
        name,
        avatar: picture, // opsional
        role: 'customer', // default role kalau mau
      });
    }

    // Generate JWT internal kamu
    const jwtToken = sign(
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
}
