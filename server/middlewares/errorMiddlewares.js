import { StatusCodes } from 'http-status-codes';

class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message, StatusCodes.NOT_FOUND);
  }
}

const notFoundHandler = (req, res) => {
  const err = new CustomAPIError(
    `Route not found - ${req.method}: ${req.originalUrl}`,
    StatusCodes.NOT_FOUND
  );
  res.status(StatusCodes.NOT_FOUND).json({ message: err.message });
};

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  console.error(err); // Log error for debugging
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: 'An unexpected error occurred' });
};

export {
  BadRequestError,
  CustomAPIError,
  errorHandler,
  notFoundHandler,
  NotFoundError,
  UnauthenticatedError,
};
