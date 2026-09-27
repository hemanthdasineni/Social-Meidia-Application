import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { User, Post } from '../models/index.js';

export const searchGlobal = asyncHandler(async (req, res) => {
  const { q } = req.query;

  if (!q || q.trim() === '') {
    return res.status(200).json(
      new ApiResponse(200, { users: [], posts: [], tags: [] }, 'Search query empty')
    );
  }

  const queryRegex = new RegExp(q.trim(), 'i');

  const [users, posts] = await Promise.all([
    User.find({
      $or: [{ username: queryRegex }, { fullName: queryRegex }],
    })
      .select('username fullName avatar isVerified bio followersCount')
      .limit(10),
    Post.find({
      $or: [{ caption: queryRegex }, { tags: queryRegex }],
    })
      .populate('author', 'username fullName avatar isVerified')
      .sort({ createdAt: -1 })
      .limit(15),
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      { users, posts },
      'Search results retrieved successfully'
    )
  );
});

export const getExploreFeed = asyncHandler(async (req, res) => {
  const { limit = 20, cursor } = req.query;
  const parsedLimit = parseInt(limit, 10);

  const filter = {};
  if (cursor) {
    filter.createdAt = { $lt: new Date(cursor) };
  }

  const posts = await Post.find(filter)
    .sort({ likesCount: -1, createdAt: -1 })
    .limit(parsedLimit + 1)
    .populate('author', 'username fullName avatar isVerified');

  const hasNextPage = posts.length > parsedLimit;
  const resultPosts = hasNextPage ? posts.slice(0, -1) : posts;
  const nextCursor =
    resultPosts.length > 0 ? resultPosts[resultPosts.length - 1].createdAt : null;

  return res.status(200).json(
    new ApiResponse(
      200,
      { posts: resultPosts, nextCursor, hasNextPage },
      'Explore feed fetched successfully'
    )
  );
});
