const express = require("express");
const { signUp, signIn } = require("./user.controller");
const router = express.Router();

//Register
router.post("/signup", signUp)

//Login
router.post("/signin", signIn)

module.exports = router