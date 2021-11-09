const Genre = require("../../db/models/Genre");

exports.getGenreList = async (req, res, next) => {
    try {
        const genreList = await Genre.find().populate('movies').populate('celebrities')
        return res.status(200).json(genreList)
    } catch (error) {
        next(error)
    }
}

exports.createGenre = async (req, res, next) => {
    try {
        const newGenre = await Genre.create(req.body);
        return res.status(201).json(newGenre)
    } catch (error) {
        next(error)
    }
}