const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.admin = function(req, res, next) {
  const token = req.header(config.auth_headerKey);
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, config.jwt_secret);

    req.next();
  } catch (ex) {
    res.status(401).send('Access denied. Invalid token.');
  }
};
