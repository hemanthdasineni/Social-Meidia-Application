import mongoose from 'mongoose';

/**
 * Comment Schema
 * Relationship strategy: References both `post` and `author`.
 * Uses a parent reference pattern (`post: ObjectId`) rather than embedding comments in Post.
 * Reason: Posts can receive thousands of comments. Referencing allows infinite growth, clean cursor pagination,
 * and avoids concurrent write write-conflicts and 16MB document size limits.
 */
const commentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
      index: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    content: {
      type: String,
      required: [true, 'Comment content cannot be empty'],
      trim: true,
      maxlength: [1000, 'Comment cannot exceed 1000 characters'],
    },
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      default: null,
      index: true,
    },
    likesCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Compound index for chronological querying of post comments
commentSchema.index({ post: 1, createdAt: -1 });
commentSchema.index({ post: 1, parentComment: 1, createdAt: 1 });

export const Comment = mongoose.model('Comment', commentSchema);
