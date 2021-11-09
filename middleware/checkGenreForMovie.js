const Genre = require("../db/models/Genre");

exports.checkGenreForMovie = async (req, res, next) => {
  //Temporary array for genres and celebs id
  const genres = [];
  try {
    //
    if (req.body.genres.includes(",")) {
      req.body.genres = req.body.genres.split(",");
    }
    console.log(`after slit `, req.body);
    //Checking for genres (string or array) and creating if they dont exist, then adding genre id to req.genres
    if (req.body.genres?.length >= 1) {
      if (typeof req.body.genres === "string") {
        const foundGenre = await Genre.findOne({
          name: `${req.body.genres.toLowerCase()}`,
        });
        if (!foundGenre)
          return next({ status: 404, message: "Genre Not Found!" });
        genres.push(foundGenre._id);
      } else {
        for (const genreName of req.body.genres) {
          genreName.toLowerCase();
          const foundGenre = await Genre.findOne({ name: `${genreName}` });
          if (foundGenre) {
            genres.push(foundGenre._id);
          } else {
            return next({ status: 404, message: "Genres Not Found!" });
          }
        }
      }
    }
    req.body.genres = genres;
    next();
  } catch (error) {
    next(error);
  }
};
