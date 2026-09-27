import mongoose from 'mongoose';

/**
 * Post Schema
 * Relationship strategy: References User as `author`.
 * Media items (images, aspect ratios, Cloudinary metadata) are embedded directly in the post
 * because they are tightly coupled to this specific post and are always retrieved together.
 * Likes, Comments, and Bookmarks are referenced in separate collections to ensure high performance
 * and avoid the 16MB document size ceiling.
 */
const mediaSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      default: null,
    },
    mediaType: {
      type: String,
      enum: ['image', 'video'],
      default: 'image',
    },
    width: {
      type: Number,
      default: null,
    },
    height: {
      type: Number,
      default: null,
    },
    aspectRatio: {
      type: String,
      default: '1:1',
    },
  },
  { _id: false }
);

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    caption: {
      type: String,
      default: '',
      maxlength: [2200, 'Caption cannot exceed 2200 characters'],
    },
    media: {
      type: [mediaSchema],
      validate: [
        {
          validator: (arr) => arr.length <= 10,
          message: 'A post cannot exceed 10 media items',
        },
      ],
      default: [],
    },
    tags: {
      type: [String],
      index: true,
      default: [],
    },
    location: {
      type: String,
      default: '',
    },
    likesCount: {
      type: Number,
      default: 0,
      min: 0,
      index: true,
    },
    commentsCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    bookmarksCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Compound indexes for feed generation and pagination
postSchema.index({ author: 1, createdAt: -1 });
postSchema.index({ createdAt: -1 });
postSchema.index({ tags: 1, createdAt: -1 });
postSchema.index({ caption: 'text', tags: 'text' });

export const Post = mongoose.model('Post', postSchema);
