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
    bio: String,
    image: String,
  },
  { timestamps: true }
);

module.exports = model("Celebrity", CelebritySchema);
