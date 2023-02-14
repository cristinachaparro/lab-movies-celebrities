const mongoose = require("mongoose");

const movieSchema = new mongoose.movieSchema({
  title: String,
  genre: String,
  plot: String,
  cast: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cast"
    },
  ],
});


const Movie = mongoose.model("Movie", movieSchema)

module.exports = Movie
