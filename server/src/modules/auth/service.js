const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ApiError = require('../../utils/ApiError');
const { getPool } = require('../../config/db');

const register = async ({ FullName, Email, Password }) => {
  const pool = await getPool();
  const existing = await pool.request().input('Email', Email).query('SELECT Id FROM Users WHERE Email = @Email');
  if (existing.recordset[0]) {
    throw new ApiError(409, 'Email is already in use');
  }

  const hash = await bcrypt.hash(Password, 10);
  const user = await pool
    .request()
    .input('FullName', FullName)
    .input('Email', Email)
    .input('PasswordHash', hash)
    .query(`
      INSERT INTO Users (FullName, Email, PasswordHash, IsActive)
      OUTPUT INSERTED.Id, INSERTED.FullName, INSERTED.Email, INSERTED.IsActive
      VALUES (@FullName, @Email, @PasswordHash, 1)
    `);

  return user.recordset[0];
};

const login = async ({ Email, Password }) => {
  const pool = await getPool();
  const result = await pool.request().input('Email', Email).query('SELECT * FROM Users WHERE Email = @Email');
  const user = result.recordset[0];

  if (!user || !(await bcrypt.compare(Password, user.PasswordHash))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  if (!user.IsActive) {
    throw new ApiError(403, 'User account is inactive');
  }

  const token = jwt.sign({ id: user.Id, email: user.Email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d'
  });

  return { token, user: { id: user.Id, fullName: user.FullName, email: user.Email } };
};

module.exports = { register, login };
