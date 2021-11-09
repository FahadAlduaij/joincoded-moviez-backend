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
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newCelebrity = await Celebrity.create(req.body);
    await newCelebrity.populate("movies");
    res.status(201).json(newCelebrity);
  } catch (error) {
    next(error);
  }
};
