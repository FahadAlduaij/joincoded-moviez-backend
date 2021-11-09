const { Schema, model } = require("mongoose");

const CelebritySchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 0,
    },
    movies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Movie",
      },
    ],
    // REVIEW: Do celebrities have genres?
    genres: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
  },
  { timestamps: true }
);

module.exports = model("Celebrity", CelebritySchema);
