const express = require('express');
const { getGenreList } = require('./genres.controllers');
const router = express.Router();
const passport = require('passport');
const { checkAdminUser } = require('../../middleware/checkAdminUser');
const { createGenre } = require('./genres.controllers');

router.get('/', getGenreList);
router.post('/',
    passport.authenticate('jwt', { session: false }),
    checkAdminUser,
    createGenre
)

module.exports = router;