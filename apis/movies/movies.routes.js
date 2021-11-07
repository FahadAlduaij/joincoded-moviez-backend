const express = require('express');
const { getMovieList, createMovie } = require('./movies.controller');
const router = express.Router();
const upload = require('../../middleware/multer')

//import passport to auth posts and CRUD, not for getting



router.get('/', getMovieList);
router.post('/', upload.single('image'), createMovie);



module.exports = router