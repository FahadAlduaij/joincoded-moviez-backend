const express = require("express");
const router = express.Router();
const passport = require("passport");

// Import Controllers
const { signUp, signIn } = require("./user.controller");

// Routes
router.post("/signup", signUp);
router.post(
	"/signin",
	passport.authenticate("local", { session: false }),
	signIn
);

module.exports = router;
