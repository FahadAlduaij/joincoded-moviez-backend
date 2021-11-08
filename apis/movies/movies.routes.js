const express = require('express');
const passport = require("passport");
const { getMovieList, createMovie } = require('./movies.controller');
const router = express.Router();
const upload = require('../../middleware/multer');
const {checkAdminUser} = require('../../middleware/checkAdminUser')
const { checkGenreForMovie } = require('../../middleware/checkGenreForMovie');
const { checkCelebForMovie } = require('../../middleware/checkCelebForMovie')

//import passport to auth posts and CRUD, not for getting

router.get('/', getMovieList);
router.post('/',
    passport.authenticate('jwt', { session: false }),
    upload.single('image'),
    checkAdminUser,
    checkGenreForMovie,
    checkCelebForMovie,
    createMovie);



module.exports = router