import emailValidator from 'email-validator';
import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';

import User from '../models/userModel.js';

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(StatusCodes.BAD_REQUEST);
    throw new Error('Please provide email and password');
  } else {
    if (!emailValidator.validate(email)) {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error('Please provide a valid email');
    } else {
      const user = await User.findOne({ email });

      if (!user) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error('Invalid credentials');
      } else {
        const isPasswordCorrect = await user.comparePassword(password);

        if (!isPasswordCorrect) {
          res.status(StatusCodes.UNAUTHORIZED);
          throw new Error('Invalid credentials');
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
    res.status(StatusCodes.BAD_REQUEST);
    throw new Error('Please provide all values');
  } else {
    if (!emailValidator.validate(email)) {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error('Please provide a valid email');
    } else {
      const userAlreadyExists = await User.findOne({ email });

      if (userAlreadyExists) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error('Email already in use');
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
            res.status(StatusCodes.BAD_REQUEST);
            throw new Error('Invalid credentials');
          }
        } else {
          res.status(StatusCodes.BAD_REQUEST);
          throw new Error('Please provide a valid role');
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
    res.status(StatusCodes.NOT_FOUND);
    throw new NotFoundError('User not found');
  }
});

export { getUserProfile, loginUser, registerUser };
