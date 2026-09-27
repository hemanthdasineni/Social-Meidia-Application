import mongoose from 'mongoose';

/**
 * Like Schema
 * Relationship strategy: Standalone referencing collection.
 * Uses a compound unique index on `{ user, post }` or `{ user, comment }`.
 * Reason: Storing likes in a separate collection prevents unbounded growth of the Post/Comment document,
 * eliminates write contention during viral spikes, and enables instant `hasLiked` lookup via indexed queries.
 */
const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      default: null,
      index: true,
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      default: null,
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Ensure a user can only like a specific post once
likeSchema.index(
  { user: 1, post: 1 },
  { unique: true, partialFilterExpression: { post: { $type: 'objectId' } } }
);

// Ensure a user can only like a specific comment once
likeSchema.index(
  { user: 1, comment: 1 },
  { unique: true, partialFilterExpression: { comment: { $type: 'objectId' } } }
);

export const Like = mongoose.model('Like', likeSchema);
