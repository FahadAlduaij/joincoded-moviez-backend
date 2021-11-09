require('dotenv').config()
const User = require("../../db/models/User");

const jwt = require("jsonwebtoken")
const { createHash } = require("../../utils/createHash")

const generateToken = (userObj) => {
    const payload = {
        _id: userObj._id,
        username: userObj.username,
        admin: userObj.admin,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '4h'});
    return token;
}

exports.signUp = async(req, res, next) => {
    try {
        req.body.password = await createHash(req.body.password);

        const newUser = await User.create(req.body);
        const token = generateToken(newUser)
        res.status(201).json({token, message: "User created"})
    } catch (error) {
        next(error)
    }
}

exports.signIn = async (req, res, next) => {
    const token = generateToken(req.user)
    res.status(200).json({token})
}