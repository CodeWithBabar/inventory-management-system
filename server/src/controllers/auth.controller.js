const jwt = require('jsonwebtoken');

const { getPool } = require('../config/db');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const pool = getPool();
    const result = await pool
      .request()
      .input('email', email)
      .input('passwordHash', password)
      .query(`
        SELECT TOP 1 UserId, FullName, Email, IsActive
        FROM Users
        WHERE Email = @email AND PasswordHash = @passwordHash
      `);

    if (!result.recordset.length) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const user = result.recordset[0];

    const token = jwt.sign(
      { sub: user.UserId, email: user.Email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    return res.status(200).json({
      token,
      user: {
        id: user.UserId,
        fullName: user.FullName,
        email: user.Email,
        isActive: user.IsActive
      }
    });
  } catch (error) {
    return next(error);
  }
};

const profile = (req, res) => {
  res.status(200).json({ user: req.user });
};

module.exports = {
  login,
  profile
};
