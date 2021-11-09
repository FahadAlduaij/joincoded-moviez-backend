const { Schema, model } = require("mongoose");

const GenreSchema = Schema(
  {
    // REVIEW: `name` not `genreName`
    // (Imagine using it: genre.genreName not cute at all)
    genreName: {
      type: String,
      unique: true,
    },
    movies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Movie",
      },
    ],
    celebrities: [{ type: Schema.Types.ObjectId, ref: "Celebrity" }],
  },
  { timestamps: true }
);

module.exports = model("Genre", GenreSchema);
