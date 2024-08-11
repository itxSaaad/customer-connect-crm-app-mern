import emailValidator from 'email-validator';
import { StatusCodes } from 'http-status-codes';

import User from '../models/userModel.js';

import asyncHandler from '../middlewares/asyncMiddleware.js';
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from '../middlewares/errorMiddlewares.js';

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  } else {
    if (!emailValidator.validate(email)) {
      throw new BadRequestError('Please provide a valid email');
    } else {
      const user = await User.findOne({ email });

      if (!user) {
        throw new UnauthenticatedError('Invalid credentials');
      } else {
        const isPasswordCorrect = await user.comparePassword(password);

        if (!isPasswordCorrect) {
          throw new UnauthenticatedError('Invalid credentials');
        } else {
          const token = user.generateAuthToken();

          res.status(StatusCodes.OK).json({
            user: {
              name: user.name,
              email: user.email,
              role: user.role,
            },
            token,
          });
        }
      }
    }
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError('Please provide all values');
  } else {
    if (!emailValidator.validate(email)) {
      throw new BadRequestError('Please provide a valid email');
    } else {
      const userAlreadyExists = await User.findOne({ email });

      if (userAlreadyExists) {
        throw new BadRequestError('Email already in use');
      } else {
        if (role === 'sales-rep' || role === 'manager') {
          const user = await User.create({ name, email, password, role });

          if (user) {
            const token = user.generateAuthToken();

            res.status(StatusCodes.CREATED).json({
              user: {
                name: user.name,
                email: user.email,
                role: user.role,
              },
              token,
            });
          } else {
            throw new UnauthenticatedError('Invalid credentials');
          }
        } else {
          throw new BadRequestError('Please provide a valid role');
        }
      }
    }
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    res.status(StatusCodes.OK).json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } else {
    throw new NotFoundError('User not found');
  }
});

export { getUserProfile, loginUser, registerUser };
