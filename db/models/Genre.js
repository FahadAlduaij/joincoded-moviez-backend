const { Schema, model } = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const GenreSchema = Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
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

GenreSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });
module.exports = model("Genre", GenreSchema);
