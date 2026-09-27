import mongoose from 'mongoose';

/**
 * Follow Schema
 * Relationship strategy: Standalone referencing collection representing the edge in a social graph.
 * Unique compound index on `{ follower, following }`.
 * Reason: Storing follower/following IDs as arrays inside User models degrades performance and eventually fails
 * for accounts with tens of thousands of followers due to 16MB document limit.
 * Standalone collection allows high-throughput graph queries, mutual follower calculation, and scalable pagination.
 */
const followSchema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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

// Prevent duplicate follow relationships
followSchema.index({ follower: 1, following: 1 }, { unique: true });
// Index for querying followers of a user chronologically
followSchema.index({ following: 1, createdAt: -1 });
// Index for querying who a user is following chronologically
followSchema.index({ follower: 1, createdAt: -1 });

export const Follow = mongoose.model('Follow', followSchema);
