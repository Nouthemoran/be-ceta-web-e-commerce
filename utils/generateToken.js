import jwt from 'jsonwebtoken';

export const generateToken = (userId, email) => {
  return jwt.sign({ id: userId, email }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};
