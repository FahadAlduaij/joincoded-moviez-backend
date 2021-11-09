const Movie = require("../../db/models/Movie");
const Genre = require("../../db/models/Genre");
const Celebrity = require("../../db/models/Celebrity");

exports.getMovieList = async (req, res, next) => {
	try {
		const movieList = await Movie.find().populate({
			path: "genres",
			select: "genreName",
		}).populate({ path: "celebrities", select: "name" });
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
		await newMovie.populate({ path: "genres", select: "name" });
		await newMovie.populate({ path: "celebrities", select: "name" })
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
