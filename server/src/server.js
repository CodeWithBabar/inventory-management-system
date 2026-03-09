require('dotenv').config();
const app = require('./app');
const { getPool } = require('./config/db');

const port = process.env.PORT || 5000;

(async () => {
  await getPool();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})();
