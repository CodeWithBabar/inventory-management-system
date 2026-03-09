const sql = require('mssql');

const config = {
  server: process.env.DB_SERVER,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT || 1433),
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.DB_TRUST_CERT === 'true'
  }
};

let pool;

const connectToDatabase = async () => {
  pool = await sql.connect(config);
  return pool;
};

const getPool = () => {
  if (!pool) {
    throw new Error('Database pool not initialized. Call connectToDatabase first.');
  }
  return pool;
};

module.exports = {
  sql,
  connectToDatabase,
  getPool
};
