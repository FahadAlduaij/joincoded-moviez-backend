const { Schema, model } = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const MovieSchema = Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    image: String,
    releaseDate: {
      type: Number,
      min: 1850,
      max: 2050,
    },
    genres: [
      {
        type: Schema.Types.ObjectId,
        ref: "Genre",
        required: true,
      },
    ],
    celebrities: [
      { type: Schema.Types.ObjectId, ref: "Celebrity", required: true },
    ],
    description: String,
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
          trim: true,
        },
        username: String,
        message: { type: String, required: true },
        dateSent: { type: Date, default: Date.now },
      },
    ],
    usersWhoRated: [{ type: Schema.Types.ObjectId, ref: "User" }],
    userRatings: [{ type: Number }],
    userRatingsSum: Number,
    avgRating: Number,
  },
  { timestamps: true }
);
//Check how to create ratings, one per user and calculate average... same with comments
MovieSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=title%>" });
module.exports = model("Movie", MovieSchema);
