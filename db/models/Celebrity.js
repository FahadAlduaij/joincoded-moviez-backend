const { Schema, model } = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const CelebritySchema = Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
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
    bio: { type: String, trim: true },
    image: String,
  },
  { timestamps: true }
);

CelebritySchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });
module.exports = model("Celebrity", CelebritySchema);
