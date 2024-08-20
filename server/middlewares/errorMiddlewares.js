import { StatusCodes } from 'http-status-codes';

const notFoundHandler = (req, res) => {
  const err = new Error(`Route not found - ${req.method}: ${req.originalUrl}`);
  res.status(StatusCodes.NOT_FOUND).json({ message: err.message });
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
};

export { errorHandler, notFoundHandler };
