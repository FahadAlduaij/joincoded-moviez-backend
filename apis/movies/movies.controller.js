const Movie = require("../../db/models/Movie");
const Genre = require("../../db/models/Genre");

exports.getMovieList = async (req, res, next) => {
	try {
		const movieList = await Movie.find().populate({
			path: "genres",
			select: "genreName",
		});
		return res.status(200).json(movieList);
	} catch (error) {
		next(error);
	}
};

//Need to check for celebrities
exports.createMovie = async (req, res, next) => {
	try {
		if (req.file) {
			req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
		}
		req.genres = [];
		req.celebrities = [];

		//Checking for genres and creating if they dont exist, then adding genre id to req.genres
		for (const genreName of req.body.genres) {
			genreName.toLowerCase();
			const genreObj = {
				genreName: genreName,
				movies: [],
				celebrities: [],
			};
			const foundGenre = await Genre.findOne({ genreName: `${genreName}` });
			if (!foundGenre) {
				const newGenre = await Genre.create(genreObj);
				req.genres.push(newGenre._id);
			} else {
				req.genres.push(foundGenre._id);
			}
		}

		// for (const celebrityName of req.body.celebrities) {
		//     genreName.toLowerCase()
		//     const genreObj = {
		//         genre: genreName,
		//         movies: [],
		//         celebrities: []
		//     }
		//     const foundGenre = await Genre.findOne({ name: `${celebrityName}` });
		//     if (!foundGenre) {
		//         const newGenre = await Genre.create(genreObj);
		//         req.genres.push(newGenre._id)
		//     } else {
		//         req.genres.push(foundGenre._id)
		//     }
		// }

		// req.body.
		req.body.genres = req.genres;
		const newMovie = await Movie.create(req.body);
		await newMovie.populate({ path: "genres", select: "genreName" });

		// Adding Created movies by id to genres
		for (const genre of req.body.genres) {
			const foundGenre = await Genre.findByIdAndUpdate(
				{ _id: genre._id },
				{ $push: { movies: newMovie._id } }
			);
		}

		res.status(201).json(newMovie);
	} catch (error) {
		next(error);
	}
};
