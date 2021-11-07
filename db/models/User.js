const { Schema, model } = require("mongoose");

const UserSchema = Schema({
    username: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
        match: /.+\@.+\..+/,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
},
    {timestamps: true}
)

module.exports = model("User", UserSchema)