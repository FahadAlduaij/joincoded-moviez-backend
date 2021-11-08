const express = require('express');
const { getGenreList } = require('./genres.controllers');
const router = express.Router();

router.get('/', getGenreList);

module.exports = router;