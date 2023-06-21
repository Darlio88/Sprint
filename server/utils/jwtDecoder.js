const jwt = require("jsonwebtoken")

function decodeToken(token, secretKey) {
    try {
      const decoded = jwt.verify(token, secretKey);
      console.log(decoded)
      return decoded;
    } catch (error) {
      // Handle any error that occurs during token verification
      console.error('Token verification failed:', error);
      return null;
    }
  }
  

module.exports=decodeToken;