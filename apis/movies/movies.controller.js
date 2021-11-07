const Movie = require('../../db/models/Movie');

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
        const newMovie = await Movie.create(req.body)
        res.status(201).json(newMovie)
    } catch (error) {
        next(error)
    }
}