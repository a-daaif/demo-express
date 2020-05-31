const jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {
  const authorization = req.headers.authorization

  if (!authorization) res.status(403).send("Forbidden");
  const token = authorization.split(/ +/)[1];
  jwt.verify(token, 'secret123', function (err, data) {
    if (err) res.status(403).send("Token invalide");
    req.data = data;
    req.token = token;
    next();
  })
}