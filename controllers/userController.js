import { User } from '../models/Index.js';
import { generateToken } from '../utils/generateToken.js';

// REGISTER
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = await User.create({
      username,
      email,
      password,
    });

    res.status(201).json({ message: 'User Created', data: newUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// LOGIN 
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cari user berdasarkan email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    // Bandingin password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Password salah' });
    }

    // Bikin token JWT
    const token = generateToken(user.id);

    res.status(200).json({ message: 'Login berhasil', token });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
  }
};

// LOGOUT
const logoutUser = async (req, res) => {
  try {
    // Logout biasanya cuma hapus token di frontend, jadi kita balikin respon sukses aja.
    res.status(200).json({ message: 'Logout sukses, hapus token di client!' });
  } catch (err) {
    res.status(500).json({ error: 'Logout gagal', details: err.message });
  }
};


export default { registerUser, loginUser, logoutUser };
