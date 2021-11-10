const Movie = require("../../db/models/Movie");
const Genre = require("../../db/models/Genre");
const Celebrity = require("../../db/models/Celebrity");

exports.findMovie = async (movieId, next) => {
  try {
    const foundMovie = await Movie.findById(movieId);
    return foundMovie;
  } catch (error) {
    next(error);
  }
};

exports.getMovieList = async (req, res, next) => {
  try {
    const movieList = await Movie.find()
      .populate("genres")
      .populate("celebrities");
    return res.status(200).json(movieList);
  } catch (error) {
    next(error);
  }
};

exports.createMovie = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }

    const newMovie = await Movie.create(req.body);
    await newMovie.populate("genres");
    await newMovie.populate("celebrities");
    // Adding Created movies by id to genres
    req.body.genres.forEach(async (genre) => {
      await Genre.findByIdAndUpdate(
        { _id: genre._id },
        { $push: { movies: newMovie._id } }
      );
    });

    req.body.celebrities.forEach(async (celeb) => {
      await Celebrity.findByIdAndUpdate(
        { _id: celeb._id },
        { $push: { movies: newMovie._id } }
      );
    });

    return res.status(201).json(newMovie);
  } catch (error) {
    next(error);
  }
};

//req.body
// {
//   movieId,
//   userId,
//   userRating
// }

// exports.addMovieRating = async (req, res, next) => {
//   try {
//     const ratingsSum = req.movie.reduce()

//     const userRatings = req.movie.length + 1;
//     const ratings = req.movie
//     const avgRating

//     const updatedMovie = await Movie.findByIdAndUpdate(req.movie, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     return res.status(200).json(updatedMovie);
//   } catch (error) {
//     next(error);
//   }
// };

exports.addCommentToMovie = async (req, res, next) => {
  try {
    const updatedComments = await Movie.findByIdAndUpdate(
      req.movie,
      { $push: { comments: req.body.comment } },
      {
        new: true,
        runValidators: true,
      }
    );
    return res.status(200).json(updatedComments);
  } catch (error) {
    next(error);
  }
};
