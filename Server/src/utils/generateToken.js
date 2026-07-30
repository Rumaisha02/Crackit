import jwt from 'jsonwebtoken';

/**
 * Generate a JWT token for authenticated user
 * @param {string} id - User Mongo ID
 * @returns {string} Signed JWT token
 */
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_jwt_secret', {
    expiresIn: '30d',
  });
};
