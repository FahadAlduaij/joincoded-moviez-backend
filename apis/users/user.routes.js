const express = require("express");
const { signUp, signIn } = require("./user.controller");
const router = express.Router();
const passport = require("passport")
//Register
router.post("/signup", signUp)

//Login
router.post("/signin", passport.authenticate("local", {session: false}),signIn)

module.exports = router