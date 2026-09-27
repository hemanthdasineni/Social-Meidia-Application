import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Comment, Post } from '../models/index.js';

export const getPostComments = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { limit = 20, cursor } = req.query;
  const parsedLimit = parseInt(limit, 10);

  const filter = { post: postId, parentComment: null };
  if (cursor) {
    filter.createdAt = { $lt: new Date(cursor) };
  }

  const comments = await Comment.find(filter)
    .sort({ createdAt: -1 })
    .limit(parsedLimit + 1)
    .populate('author', 'username fullName avatar isVerified');

  const hasNextPage = comments.length > parsedLimit;
  const resultComments = hasNextPage ? comments.slice(0, -1) : comments;
  const nextCursor =
    resultComments.length > 0 ? resultComments[resultComments.length - 1].createdAt : null;

  return res.status(200).json(
    new ApiResponse(
      200,
      { comments: resultComments, nextCursor, hasNextPage },
      'Comments fetched successfully'
    )
  );
});

export const createComment = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { content, parentCommentId } = req.body;

  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, 'Post not found');
  }

  const comment = await Comment.create({
    post: postId,
    author: req.user._id,
    content,
    parentComment: parentCommentId || null,
  });

  await Post.findByIdAndUpdate(postId, { $inc: { commentsCount: 1 } });
  const populatedComment = await Comment.findById(comment._id).populate(
    'author',
    'username fullName avatar isVerified'
  );

  return res
    .status(201)
    .json(new ApiResponse(201, populatedComment, 'Comment added successfully'));
});

export const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new ApiError(404, 'Comment not found');
  }

  if (comment.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'You do not have permission to delete this comment');
  }

  await Comment.findByIdAndDelete(commentId);
  await Post.findByIdAndUpdate(comment.post, { $inc: { commentsCount: -1 } });

  return res
    .status(200)
    .json(new ApiResponse(200, null, 'Comment deleted successfully'));
});
