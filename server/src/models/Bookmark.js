import mongoose from 'mongoose';

/**
 * Bookmark Schema
 * Relationship strategy: Standalone referencing collection.
 * Unique compound index on `{ user, post }`.
 * Reason: Private user-specific saved post collections are kept decoupled from Posts to allow private query patterns,
 * clean pagination, and easy deletion without modifying the Post document itself.
 */
const bookmarkSchema = new mongoose.Schema(
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
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Prevent duplicate bookmarks & speed up bookmark lookups
bookmarkSchema.index({ user: 1, post: 1 }, { unique: true });
// Fast retrieval of saved posts list
bookmarkSchema.index({ user: 1, createdAt: -1 });

export const Bookmark = mongoose.model('Bookmark', bookmarkSchema);
