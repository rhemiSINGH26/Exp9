const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Provide sensible defaults for critical env vars when not set (use .env in development)
process.env.JWT_EXPIRE = process.env.JWT_EXPIRE || '1h';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security headers
app.use(helmet());

// Basic rate limiter to mitigate brute-force and denial-of-service
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/suppliers', require('./routes/suppliers'));
app.use('/api/warehouses', require('./routes/warehouses'));

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Warehouse Logistics API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
