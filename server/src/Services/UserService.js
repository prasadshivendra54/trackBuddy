const User = require("../Models/user");
const jwtProvider = require("../utils/jwtProvider");

// Find user by token
const findUserProfileByJwt = async (jwt) => {
  const email = jwtProvider.getEmailFromJwt(jwt);

  const user = await User.findOne({ email })
  if (!user) {
    throw (`User does not exist with email ${email}`);
  }
  return user;
};

// Find user by email
const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw (`User does not exist with email ${email}`);
  }
  return user;
};

const UserService = {
  findUserProfileByJwt,
  findUserByEmail,
};

module.exports = UserService;
