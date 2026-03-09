const notFoundHandler = (req, res) => {
  res.status(404).json({ message: 'Resource not found.' });
};

const errorHandler = (error, req, res, next) => {
  console.error(error);

  if (res.headersSent) {
    return next(error);
  }

  return res.status(500).json({ message: 'Internal server error.' });
};

module.exports = {
  notFoundHandler,
  errorHandler
};
