require("dotenv").config();
const User = require("../../db/models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (userObj) => {
  const payload = {
    _id: userObj._id,
    username: userObj.username,
    admin: userObj.isAdmin,
    // Q: Why admin not isAdmin?
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "4h" });
  return token;
};

// REVIEW: NIIICE!! IT can be a middleware as well :D
const createHash = async (userPassword) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(userPassword, saltRounds);
  return hashedPassword;
};

exports.signUp = async (req, res, next) => {
  try {
    req.body.password = await createHash(req.body.password);

    const newUser = await User.create(req.body);
    const token = generateToken(newUser);
    res.status(201).json({ token, message: "User created" });
  } catch (error) {
    next(error);
  }
};

exports.signIn = async (req, res, next) => {
  const token = generateToken(req.user);
  res.status(200).json({ token });
};
