const crypto = require("crypto");
const jwt = require("jsonwebtoken");

function generateRandomToken(length) {
    return crypto.randomBytes(length).toString('hex');
}
  
function generateAccessToken(userId) {
    const payload = { id: userId };
    const secret = process.env.TOKEN_SECRET; // Replace with your actual secret key
    const expiresIn = '1800s'; // 30 minutes

    const token = jwt.sign(payload, secret, { expiresIn });

    return token;
}

function generateRandomNumber() {
  const min = 1000;
  const max = 9999;
  
  const random4DigitNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return random4DigitNumber;
}
  
module.exports = {generateRandomToken,generateAccessToken, generateRandomNumber}