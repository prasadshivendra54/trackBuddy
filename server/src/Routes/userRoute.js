const express = require("express");
const User = require("../Models/user");
const VerificationCode = require("../Models/VerificationCode");
const jwtProvider = require("../utils/jwtProvider");
const authMiddleware = require("../Middleware/userAuthMiddleware");

const router = express.Router();


// signup new user
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if(!name || !email || !password){
    res.status(400).json("Enter all fieds")
  }

  const findEmail = await User.findOne({email})
  if(findEmail){
    res.status(400).json("Email alrady exist")
  }

  try {
    const signupUser = await User.create({
      name,
      email,
      password,
    });
    const token = jwtProvider.createJwt({ email });
    // ✅ return user + jwt together
    return res.status(201).json({
        id: signupUser._id,
        name: signupUser.name,
        email: signupUser.email,
        jwt: token,
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error.message,
    });
  }
});


// signin or login user
router.post("/signin", async (req, res) => {

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    console.log("user : ", user);
    if (!user) {
      return res.status(404).json({
        message: "Invalid username or password",
      });
    }
    const token = jwtProvider.createJwt({ email });

    return res.status(200).json({
        message: "Login Success",
        jwt: token
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error.message,
    });
  }
});


// See profile
router.get("/profile", authMiddleware, async (req, res) => {
    try {
        const user = await req.user;
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json("Server error");
    }
});



module.exports = router
