const path = require('path');
const dotenv = require('dotenv');

// Load .env from backend root, overriding any existing environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env'), override: true });

const PORT = parseInt(process.env.PORT, 10) || 5000;
const rawUri = process.env.MONGODB_URI?.trim();
if (!rawUri) {
  console.error('MONGODB_URI not set in environment');
  process.exit(1);
}
const MONGODB_URI = rawUri;
// Raw MONGODB_URI logging removed for security
console.log('MongoDB configuration source: backend/.env');
const JWT_SECRET = process.env.JWT_SECRET || 'medastra_hackathon_super_secret_jwt_key_2026';
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  PORT,
  MONGODB_URI,
  JWT_SECRET,
  NODE_ENV
};
