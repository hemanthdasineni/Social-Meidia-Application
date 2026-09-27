import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/User.js';
import { ENV } from '../config/env.js';

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    throw new ApiError(401, 'Unauthorized request: No token provided');
  }

  try {
    const decodedToken = jwt.verify(token, ENV.JWT_SECRET);
    const user = await User.findById(decodedToken.id).select('-password');

    if (!user) {
      throw new ApiError(401, 'Invalid Access Token: User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error.message || 'Invalid or expired Access Token');
  }
});

// Optional auth for public feeds that show personalized status if logged in
export const optionalAuth = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decodedToken = jwt.verify(token, ENV.JWT_SECRET);
    const user = await User.findById(decodedToken.id).select('-password');
    req.user = user || null;
  } catch {
    req.user = null;
  }
  next();
});
