import { ApiResponse } from '../utils/ApiResponse.js';
import { getDBStatus } from '../config/db.js';

export const checkHealth = (req, res) => {
  const healthData = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: getDBStatus(),
    version: '1.0.0',
    service: 'VibeStream REST API',
  };

  return res
    .status(200)
    .json(new ApiResponse(200, healthData, 'VibeStream API service is healthy'));
};
