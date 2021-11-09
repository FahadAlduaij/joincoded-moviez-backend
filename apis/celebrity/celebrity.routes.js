const express = require("express");
const router = express.Router();
const passport = require("passport");
const upload = require("../../middleware/multer");
const { checkAdminUser } = require("../../middleware/checkAdminUser");
const { fetchCelebrity, createCelebrity } = require("./celebrity.controllers");

router.get("/", fetchCelebrity);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  checkAdminUser,
  createCelebrity
);

module.exports = router;
