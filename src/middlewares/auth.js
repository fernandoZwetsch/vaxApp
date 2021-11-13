
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ success: false, message: 'No token provided'});
  }

  jwt.verify(token, 'vax-app', (err, decoded) =>{
    if (err) {
      return res.status(401).send({ success: false, message: 'Token invalid'});
    }

    req.userId = decoded.id;
    req.refCode = decoded.refCode;

    return next()
  })
}