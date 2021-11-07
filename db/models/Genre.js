const { Schema, model } = require("mongoose");

const GenreSchema = Schema({
    genre: {
        type: String,
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