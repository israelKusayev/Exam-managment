const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.admin = function(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, config.jwt_secret);
    req.userId = decoded.sub;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};