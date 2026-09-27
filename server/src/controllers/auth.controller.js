import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { User } from '../models/User.js';
import { ENV } from '../config/env.js';

const cookieOptions = {
  httpOnly: true,
  secure: ENV.NODE_ENV === 'production',
  sameSite: ENV.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: ENV.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
};

export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, fullName, password } = req.body;

  const existingUser = await User.findOne({
    $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }],
  });

  if (existingUser) {
    throw new ApiError(409, 'User with this email or username already exists');
  }

  const user = await User.create({
    username,
    email,
    fullName,
    password,
  });

  const token = user.generateAccessToken();
  const createdUser = await User.findById(user._id).select('-password');

  return res
    .status(201)
    .cookie('accessToken', token, cookieOptions)
    .json(
      new ApiResponse(
        201,
        { user: createdUser, token },
        'User registered successfully'
      )
    );
});

export const loginUser = asyncHandler(async (req, res) => {
  const { emailOrUsername, password } = req.body;

  const user = await User.findOne({
    $or: [
      { email: emailOrUsername.toLowerCase() },
      { username: emailOrUsername.toLowerCase() },
    ],
  }).select('+password');

  if (!user) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const token = user.generateAccessToken();
  const loggedInUser = await User.findById(user._id).select('-password');

  return res
    .status(200)
    .cookie('accessToken', token, cookieOptions)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, token },
        'User logged in successfully'
      )
    );
});

export const logoutUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .clearCookie('accessToken', cookieOptions)
    .json(new ApiResponse(200, {}, 'User logged out successfully'));
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(200, { user: req.user }, 'Current user fetched successfully')
    );
});
