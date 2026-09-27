import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { app } from './app.js';
import { connectDB } from './config/db.js';
import { ENV } from './config/env.js';

const server = http.createServer(app);

// Setup Socket.IO Server for real-time notifications (Phase 3 ready)
const io = new SocketIOServer(server, {
  cors: {
    origin: [ENV.CLIENT_URL, 'http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log(`⚡ WebSocket client connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`🔌 WebSocket client disconnected: ${socket.id}`);
  });
});

// Attach io to app instance for controllers in later phases
app.set('io', io);

// Start server after DB connection
const startServer = async () => {
  await connectDB();

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`⚠️ Port ${ENV.PORT} is already in use. Please check if another instance is running.`);
    } else {
      console.error('Server error:', err);
    }
  });

  server.listen(ENV.PORT, () => {
    console.log(`🚀 VibeStream Server running in ${ENV.NODE_ENV} mode on port ${ENV.PORT}`);
    console.log(`👉 Health check: http://localhost:${ENV.PORT}/api/health`);
  });
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...', err);
  server.close(() => {
    process.exit(1);
  });
});

startServer();
