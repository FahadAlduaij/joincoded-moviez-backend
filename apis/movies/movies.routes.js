const express = require('express');
const { getMovieList, createMovie } = require('./movies.controller');
const router = express.Router();
//import passport to auth posts and CRUD, not for getting



router.get('/', getMovieList);
router.post('/', createMovie);



module.exports = router