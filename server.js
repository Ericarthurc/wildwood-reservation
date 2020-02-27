const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const morgan = require('morgan');
const history = require('connect-history-api-fallback');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const chalk = require('chalk');
const errorHandler = require('./middleware/error');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
require('./config/db');

// Route files
const users = require('./routes/users');
const services = require('./routes/services');
const admins = require('./routes/admins');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Pass socket to req
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Cookie parser
app.use(cookieParser());

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/v2/users', users);
app.use('/api/v2/services', services);
app.use('/api/v2/admins', admins);

// History mode for React Router
app.use(history());

// Serve Static React
app.use(express.static('./frontend/build'));

// Custom error handler
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(chalk.yellow.underline.bold(`Server running on port ${PORT}`));
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error, promise) => {
  console.log(chalk.red(`Error: ${error.message}`));
  // Close server & exit process
  server.close(() => process.exit(1));
});
