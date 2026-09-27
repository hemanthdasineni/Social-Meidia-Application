import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Notification } from '../models/index.js';

export const getNotifications = asyncHandler(async (req, res) => {
  const { limit = 30, cursor } = req.query;
  const parsedLimit = parseInt(limit, 10);

  const filter = { recipient: req.user._id };
  if (cursor) {
    filter.createdAt = { $lt: new Date(cursor) };
  }

  const notifications = await Notification.find(filter)
    .sort({ createdAt: -1 })
    .limit(parsedLimit + 1)
    .populate('sender', 'username fullName avatar isVerified')
    .populate('post', 'caption media');

  const hasNextPage = notifications.length > parsedLimit;
  const resultNotifications = hasNextPage ? notifications.slice(0, -1) : notifications;
  const nextCursor =
    resultNotifications.length > 0
      ? resultNotifications[resultNotifications.length - 1].createdAt
      : null;

  return res.status(200).json(
    new ApiResponse(
      200,
      { notifications: resultNotifications, nextCursor, hasNextPage },
      'Notifications fetched successfully'
    )
  );
});

export const markNotificationsAsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany(
    { recipient: req.user._id, isRead: false },
    { $set: { isRead: true } }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, null, 'All notifications marked as read'));
});
