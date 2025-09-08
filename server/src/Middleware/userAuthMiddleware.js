const UserService = require('../Services/UserService')

// Middleware to check if user is logged in
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Authorization header is missing" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "jwt token is missing" });
    }

    const user = await UserService.findUserProfileByJwt(token)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Error in authentication middleware: ", error.message);
    console.log(error)
    return res.status(500).json({ message: error.message });
  }
};

module.exports = authMiddleware;