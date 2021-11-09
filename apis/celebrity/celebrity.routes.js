const express = require("express");
const router = express.Router();

const { fetchCelebrity, createCelebrity } = require("./celebrity.controllers");

router.get("/", fetchCelebrity);
router.post("/", createCelebrity);

module.exports = router;
