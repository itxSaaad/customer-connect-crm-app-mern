import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { UnauthenticatedError } from './errorMiddlewares.js';

import User from '../models/userModel.js';

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication Invalid');
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    throw new UnauthenticatedError('Authentication invalid');
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key'
    );

    req.user = await User.findById(decoded.id).select('-password');

    next();
  } catch (error) {
    throw new UnauthenticatedError('Not Authorized to access this route');
  }
};

// Middleware for role-based access control
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: 'Forbidden to access this route' });
    }
    next();
  };
};

export { protect, authorizeRoles };
