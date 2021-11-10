const express = require("express");
const passport = require("passport");
const {
  getMovieList,
  createMovie,
  addCommentToMovie,
  findMovie,
} = require("./movies.controller");
const router = express.Router();
const upload = require("../../middleware/multer");
const { checkAdminUser } = require("../../middleware/checkAdminUser");
const { checkGenreForMovie } = require("../../middleware/checkGenreForMovie");
const { checkCelebForMovie } = require("../../middleware/checkCelebForMovie");

router.param("movieId", async (req, res, next, movieId) => {
  const movie = await findMovie(movieId, next);
  if (movie) {
    req.movie = movie;
  } else {
    next({ status: 404, message: "Movie Not Found" });
  }
});

// router.post(
//   "/:movieId",
//   passport.authenticate("jwt", { session: false }),
//   addMovieRating
// );

router.post(
  "/:movieId/comments",
  passport.authenticate("jwt", { session: false }),
  checkAdminUser,
  addCommentToMovie
);

router.get("/", getMovieList);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  checkAdminUser,
  checkGenreForMovie,
  checkCelebForMovie,
  createMovie
);

module.exports = router;
