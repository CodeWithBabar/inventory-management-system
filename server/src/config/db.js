import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  server: process.env.DB_SERVER,
  port: Number(process.env.DB_PORT || 1433),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  options: {
    encrypt: String(process.env.DB_ENCRYPT).toLowerCase() === 'true',
    trustServerCertificate: String(process.env.DB_TRUST_SERVER_CERT).toLowerCase() === 'true',
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

let poolPromise;

export const getPool = async () => {
  if (!poolPromise) {
    poolPromise = sql.connect(config);
  }
  return poolPromise;
};

export { sql };
