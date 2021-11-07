const { Schema, model } = require("mongoose");

const GenreSchema = Schema({
    genreName: {
        type: String,
        unique: true,
    },
    movies: [{
        type: Schema.Types.ObjectId,
        ref: 'Movie'
    }],
    celebrities: [{type: Schema.Types.ObjectId, ref: 'Celebrity'}]
},
    {timestamps: true}
)

module.exports = model("Genre", GenreSchema)
