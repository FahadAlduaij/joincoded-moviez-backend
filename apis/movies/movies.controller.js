const Movie = require('../../db/models/Movie');
const Genre = require('../../db/models/Genre')

exports.getMovieList = async (req, res, next) => {
    try {
        const movieList = await Movie.find();
        return res.status(200).json(movieList);
    } catch (error) {
        next(error);
    }
};

exports.createMovie = async (req, res, next) => {
    try {
        if (req.file) {
            req.body.image = `http://${req.get("host")}/media/${req.file.filename}`
        }
        req.genres = [];
        for (const genreName of req.body.genre) {
            const genre = {
                genre: genreName.toLowerCase(),
                movies: [],
                celebrities: []
            }
            const foundGenre = await Genre.findOne(genre);
            if (!foundGenre) {

                const newGenre = await Genre.create(genre);
                req.genres.push(newGenre._id)
            }
        }

        req.body.genre = req.genres
        const newMovie = await Movie.create(req.body)

        res.status(201).json(newMovie)
    } catch (error) {
        next(error)
    }
}