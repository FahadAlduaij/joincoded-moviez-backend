const Celebrity = require("../../db/models/Celebrity");

exports.fetchCelebrity = async (req, res, next) => {
	try {
		const celebrityList = await Celebrity.find().populate("movies");
		return res.status(200).json(celebrityList);
	} catch (error) {
		next(error);
	}
};

exports.createCelebrity = async (req, res, next) => {
	try {
		const newCelebrity = await Celebrity.create(req.body);
		res.status(201).json(newCelebrity);
	} catch (error) {
		next(error);
	}
};
