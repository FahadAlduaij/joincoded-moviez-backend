const Celebrity = require("../db/models/Celebrity");

exports.checkCelebForMovie = async (req, res, next) => {
	//Temporary array for genres and celebs id

	try {
		const celebrities = [];

		if (
			typeof req.body.celebrities === "string" &&
			req.body.celebrities.includes(",")
		) {
			req.body.celebrities = req.body.celebrities.split(",");
		}
		//Checking for celebrities (string or array) and creating if they dont exist, then adding celebrity id to req.celebrities
		if (req.body.celebrities && req.body.celebrities.length >= 1) {
			if (typeof req.body.celebrities === "string") {
				const foundCeleb = await Celebrity.findOne({
					name: `${req.body.celebrities}`,
				});
				if (!foundCeleb)
					return next({ status: 404, message: "celebrity Not Found!" });
				celebrities.push(foundCeleb._id);
			} else {
				for (const celebName of req.body.celebrities) {
					celebName;
					const foundCeleb = await Celebrity.findOne({ name: `${celebName}` });
					if (foundCeleb) {
						celebrities.push(foundCeleb._id);
					} else {
						return next({ status: 404, message: "celebrities Not Found!" });
					}
				}
			}
		}
		req.body.celebrities = celebrities;
		next();
	} catch (error) {
		next(error);
	}
	//Check event planner for mongoose query expressions to simplify the code
};
