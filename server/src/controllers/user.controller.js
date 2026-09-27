import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { User, Follow, Post } from '../models/index.js';

export const getUserProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;

  const user = await User.findOne({ username: username.toLowerCase() });
  if (!user) {
    throw new ApiError(404, 'User profile not found');
  }

  let isFollowing = false;
  if (req.user) {
    const followRecord = await Follow.findOne({
      follower: req.user._id,
      following: user._id,
    });
    isFollowing = !!followRecord;
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        profile: user,
        isFollowing,
        isSelf: req.user?._id?.toString() === user._id?.toString(),
      },
      'User profile fetched successfully'
    )
  );
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { fullName, bio, website, location, isPrivate } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        ...(fullName && { fullName }),
        ...(bio !== undefined && { bio }),
        ...(website !== undefined && { website }),
        ...(location !== undefined && { location }),
        ...(isPrivate !== undefined && { isPrivate }),
      },
    },
    { new: true, runValidators: true }
  ).select('-password');

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, 'Profile updated successfully'));
});

export const followUser = asyncHandler(async (req, res) => {
  const { targetUserId } = req.params;

  if (targetUserId === req.user._id.toString()) {
    throw new ApiError(400, 'You cannot follow yourself');
  }

  const targetUser = await User.findById(targetUserId);
  if (!targetUser) {
    throw new ApiError(404, 'Target user not found');
  }

  const existingFollow = await Follow.findOne({
    follower: req.user._id,
    following: targetUserId,
  });

  if (existingFollow) {
    // Unfollow
    await Follow.findByIdAndDelete(existingFollow._id);
    await User.findByIdAndUpdate(req.user._id, { $inc: { followingCount: -1 } });
    await User.findByIdAndUpdate(targetUserId, { $inc: { followersCount: -1 } });

    return res
      .status(200)
      .json(new ApiResponse(200, { isFollowing: false }, 'Unfollowed user successfully'));
  }

  // Follow
  await Follow.create({
    follower: req.user._id,
    following: targetUserId,
  });
  await User.findByIdAndUpdate(req.user._id, { $inc: { followingCount: 1 } });
  await User.findByIdAndUpdate(targetUserId, { $inc: { followersCount: 1 } });

  return res
    .status(200)
    .json(new ApiResponse(200, { isFollowing: true }, 'Followed user successfully'));
});
