const Movie = require("../../db/models/Movie");
const Genre = require("../../db/models/Genre");
const Celebrity = require("../../db/models/Celebrity");

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
		//Checking is user is admin
		if(!req.user.isAdmin) return next({status: 401, message: "Not admin user"})

		if (req.file) {
			req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
		}

		//Temporary array for genres and celebs id
		req.genres = [];
		req.celebrities = [];
		
		//Checking for genres (string or array) and creating if they dont exist, then adding genre id to req.genres
		if(req.body.genres && req.body.genres.length >= 1){
			if (typeof req.body.genres === 'string') {
				const foundGenre = await Genre.findOne({ genreName: `${req.body.genres.toLowerCase()}` });
				if (!foundGenre) return next({ status: 404, message: "Genre Not Found!" })
				req.genres.push(foundGenre._id)
			} else {
				for (const genreName of req.body.genres) {
					genreName.toLowerCase();
					const foundGenre = await Genre.findOne({ genreName: `${genreName}` });
					if (foundGenre) {
						req.genres.push(foundGenre._id);
					} else {
						return next({status: 404, message: 'Genres Not Found!'})
					}
				}
			}
		}

		//Checking for celebrities (string or array) and creating if they dont exist, then adding celebrity id to req.celebrities
		if (req.body.celebrities && req.body.celebrities.length >= 1) {
			if (typeof req.body.celebrities === 'string') {
				const foundCeleb = await Celebrity.findOne({ name: `${req.body.celebrities.toLowerCase()}` });
				if (!foundCeleb) return next({ status: 404, message: "Genre Not Found!" })
				req.celebrities.push(foundCeleb._id)
			} else {
				for (const celebName of req.body.celebrities) {
					celebName.toLowerCase();
					const foundCeleb = await Celebrity.findOne({ name: `${celebName}` });
					if (foundCeleb) {
						req.celebrities.push(foundCeleb._id);
					} else {
						return next({status: 404, message: 'celebrities Not Found!'})
					}
				}
			}
		}


		//Creating Movie in Database
		req.body.genres = req.genres;
		req.body.celebrities = req.celebrities;
		const newMovie = await Movie.create(req.body);
		await newMovie.populate({ path: "genres", select: "genreName" });
		await newMovie.populate({ path: "celebrities", select: "name" })
		// Adding Created movies by id to genres
		for (const genre of req.body.genres) {
			await Genre.findByIdAndUpdate(
				{ _id: genre._id },
				{ $push: { movies: newMovie._id } }
			);
		}
		// Adding Created movies by id to genres
		for (const celeb of req.body.celebrities) {
			await Celebrity.findByIdAndUpdate(
				{ _id: celeb._id },
				{ $push: { movies: newMovie._id } }
			);
		}

		return res.status(201).json(newMovie);
	} catch (error) {
		next(error);
	}
};
