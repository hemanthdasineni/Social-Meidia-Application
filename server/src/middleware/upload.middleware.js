import multer from 'multer';
import { storage } from '../config/cloudinary.js';
import { ApiError } from '../utils/ApiError.js';

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new ApiError(400, 'Invalid file format: Only images (JPG, PNG, WEBP, GIF) are allowed'), false);
  }
};

export const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max file size
  },
  fileFilter,
});

// Memory storage for avatar/profile buffer processing if needed
export const memoryUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter,
});
