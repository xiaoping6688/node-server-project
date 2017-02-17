var jwt = require('express-jwt')
var secret = require('../../config/secret').token_secret_key

module.exports = jwt({
  secret: Buffer.from(secret, 'base64'),
  requestProperty: 'user', // By default, the decoded token is attached to req.user
  credentialsRequired: true, // You might want to use this module to identify registered users while still providing access to unregistered users
  getToken: function fromHeaderOrQuerystring (req) { // Where the token is
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null
  }
}).unless({
  path: [
    '/rest/register',
    '/rest/signin',
    /^(?!\/rest\/).*/
  ]
})
