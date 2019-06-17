const expressJwt = require('express-jwt');

module.exports = jwt;

function jwt() {
  const secret = process.env.SECRET_KEY;
  return expressJwt({ secret }).unless({
    path: [
      // public routes that don't require authentication
      '/auth/login',
      '/users/create'
    ]
  });
}
