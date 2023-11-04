const jwt = require('jsonwebtoken');
const User = require("../Service/UserService");

async function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({
        message: 'Unauthenticated',
      });
    }
    
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        message: 'Unauthenticated',
      });
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.id;
    const user = await User.findUserById(userId);

    if (req.body.userId && req.body.userId !== userId) {
      return res.status(403).json({
        message: 'Forbidden',
      });
    } else {
        req.user = user;
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      error: 'Invalid request!',
    });
  }
}

module.exports = authenticateToken;
