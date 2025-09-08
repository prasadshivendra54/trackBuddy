const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY; // secretkey will come from .env file


const JwtProvider = (secretKey) => {
  // Method to create JWT
  const createJwt = (payload) => {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "24h" });
  };

  const getEmailFromJwt = (token) => {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      return decoded.email;
    } catch (error) {
      throw Error("Invalid token");
    }
  };

  // Method to verify JWT
  const verifyJwt = (token) => {
    try {
      return jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      throw Error("Invalid token");
    }
  };

  return {
    createJwt,
    getEmailFromJwt,
    verifyJwt,
  };
};

module.exports = JwtProvider(SECRET_KEY);
