const app = require('./app');
const connectDB = require('./config/database');
const { PORT } = require('./config/env');

const startServer = async () => {
  try {
    // Verify MongoDB connection before starting HTTP server
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`MedAstra backend server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`Base API: http://localhost:${PORT}/api`);
    });

    // Handle server errors, especially EADDRINUSE
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Stop the existing MedAstra backend process before starting a new one.`);
      } else {
        console.error('Server error:', err);
      }
      process.exit(1);
    });

    return server;
  } catch (error) {
    console.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
