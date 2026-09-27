import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Post, Like, Bookmark, User, Follow } from '../models/index.js';

export const createPost = asyncHandler(async (req, res) => {
  const { caption, location, tags } = req.body;
  let parsedTags = [];

  if (tags) {
    parsedTags = Array.isArray(tags)
      ? tags
      : tags.split(',').map((t) => t.trim().replace(/^#/, ''));
  }

  // Handle uploaded files via Multer
  const media = [];
  if (req.files && req.files.length > 0) {
    req.files.forEach((file) => {
      media.push({
        url: file.path,
        publicId: file.filename,
        mediaType: 'image',
      });
    });
  } else if (req.body.mediaUrls && Array.isArray(req.body.mediaUrls)) {
    req.body.mediaUrls.forEach((url) => {
      media.push({
        url,
        mediaType: 'image',
      });
    });
  }

  const post = await Post.create({
    author: req.user._id,
    caption,
    location,
    tags: parsedTags,
    media,
  });

  await User.findByIdAndUpdate(req.user._id, { $inc: { postsCount: 1 } });
  const populatedPost = await Post.findById(post._id).populate('author', 'username fullName avatar isVerified');

  return res
    .status(201)
    .json(new ApiResponse(201, populatedPost, 'Post created successfully'));
});

export const getFeed = asyncHandler(async (req, res) => {
  const { limit = 10, cursor } = req.query;
  const parsedLimit = parseInt(limit, 10);

  // If user is logged in, find who they follow
  let filter = {};
  if (req.user) {
    const following = await Follow.find({ follower: req.user._id }).select('following');
    const followingIds = following.map((f) => f.following);
    // Include user's own posts and followed users' posts, or fallback to latest if empty
    if (followingIds.length > 0) {
      filter.author = { $in: [...followingIds, req.user._id] };
    }
  }

  if (cursor) {
    filter.createdAt = { $lt: new Date(cursor) };
  }

  const posts = await Post.find(filter)
    .sort({ createdAt: -1 })
    .limit(parsedLimit + 1)
    .populate('author', 'username fullName avatar isVerified');

  const hasNextPage = posts.length > parsedLimit;
  const resultPosts = hasNextPage ? posts.slice(0, -1) : posts;
  const nextCursor = resultPosts.length > 0 ? resultPosts[resultPosts.length - 1].createdAt : null;

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        posts: resultPosts,
        nextCursor,
        hasNextPage,
      },
      'Feed fetched successfully'
    )
  );
});

export const getPostById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id).populate('author', 'username fullName avatar isVerified bio');
  if (!post) {
    throw new ApiError(404, 'Post not found');
  }

  let isLiked = false;
  let isBookmarked = false;

  if (req.user) {
    const [likeRecord, bookmarkRecord] = await Promise.all([
      Like.findOne({ user: req.user._id, post: id }),
      Bookmark.findOne({ user: req.user._id, post: id }),
    ]);
    isLiked = !!likeRecord;
    isBookmarked = !!bookmarkRecord;
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      { post, isLiked, isBookmarked },
      'Post fetched successfully'
    )
  );
});

export const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);
  if (!post) {
    throw new ApiError(404, 'Post not found');
  }

  if (post.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'You do not have permission to delete this post');
  }

  await Post.findByIdAndDelete(id);
  await User.findByIdAndUpdate(req.user._id, { $inc: { postsCount: -1 } });

  return res
    .status(200)
    .json(new ApiResponse(200, null, 'Post deleted successfully'));
});

export const toggleLike = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);
  if (!post) {
    throw new ApiError(404, 'Post not found');
  }

  const existingLike = await Like.findOne({
    user: req.user._id,
    post: id,
  });

  if (existingLike) {
    await Like.findByIdAndDelete(existingLike._id);
    await Post.findByIdAndUpdate(id, { $inc: { likesCount: -1 } });

    return res
      .status(200)
      .json(new ApiResponse(200, { isLiked: false }, 'Unliked post successfully'));
  }

  await Like.create({
    user: req.user._id,
    post: id,
  });
  await Post.findByIdAndUpdate(id, { $inc: { likesCount: 1 } });

  return res
    .status(200)
    .json(new ApiResponse(200, { isLiked: true }, 'Liked post successfully'));
});

export const toggleBookmark = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);
  if (!post) {
    throw new ApiError(404, 'Post not found');
  }

  const existingBookmark = await Bookmark.findOne({
    user: req.user._id,
    post: id,
  });

  if (existingBookmark) {
    await Bookmark.findByIdAndDelete(existingBookmark._id);
    await Post.findByIdAndUpdate(id, { $inc: { bookmarksCount: -1 } });

    return res
      .status(200)
      .json(new ApiResponse(200, { isBookmarked: false }, 'Removed from bookmarks'));
  }

  await Bookmark.create({
    user: req.user._id,
    post: id,
  });
  await Post.findByIdAndUpdate(id, { $inc: { bookmarksCount: 1 } });

  return res
    .status(200)
    .json(new ApiResponse(200, { isBookmarked: true }, 'Added to bookmarks'));
});
