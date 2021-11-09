const express = require("express");
const router = express.Router();

const { fetchCelebrity } = require("./celebrity.controllers");

router.get("/", fetchCelebrity);

module.exports = router;
