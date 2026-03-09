require('dotenv').config();

const app = require('./app');
const { connectToDatabase } = require('./config/db');

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
})();
