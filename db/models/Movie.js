const { Schema, model } = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const MovieSchema = Schema(
  {
    title: {
      type: String,
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
      },
    ],
    celebrities: [{ type: Schema.Types.ObjectId, ref: "Celebrity" }],
  },
  { timestamps: true }
);
//Check how to create ratings, one per user and calculate average... same with comments
MovieSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=title%>" });
module.exports = model("Movie", MovieSchema);
