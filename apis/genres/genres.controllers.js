const Genre = require("../../db/models/Genre");
const Movie = require("../../db/models/Movie");
const Celebrity = require("../../db/models/Celebrity");

exports.getGenreList = async (req, res, next) => {
  try {
    // REVIEW: If you're just populating without specifying the fields, no need for {path: "movies"}, it can directly be populate("movies")
    const genreList = await Genre.find()
      .populate({ path: "movies" })
      .populate({ path: "celebrities" });
    res.status(200).json(genreList);
  } catch (error) {
    next(error);
  }
};
