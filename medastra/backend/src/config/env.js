const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/medastra';
const JWT_SECRET = process.env.JWT_SECRET || 'medastra_hackathon_super_secret_jwt_key_2026';
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  PORT,
  MONGODB_URI,
  JWT_SECRET,
  NODE_ENV
};
