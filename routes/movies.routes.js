const express = require("express");
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model.js");
const Movie = require("../models/Movie.model.js");

//rutas
//GET "/movies/create"
router.get("/create", async (req, res, next) => {
  try {
    const response = await Celebrity.find().select({ name: 1 });
    res.render("movies/new-movie.hbs", {
      allNamesCelebrities: response,
    });
  } catch (error) {
    next(error);
  }
});

//POST "/movies/create"
router.post("/create", async (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  try {
    await Movie.create({
      title,
      genre,
      plot,
      cast,
    });
    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

// GET "/movies/movies"
router.get("/", async (req, res, next) => {
  try {
    const response = await Movie.find().select({ title: 1 });
    res.render("movies/movies.hbs", {
      allTitleMovie: response,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  // console.log(req.params.id)

  try {
    const response = await Movie.findById(id).populate("cast");
    // console.log(response.cast)
    // const allNamesCelebritiesDetail = await Celebrity.findById(response.cast)
    // console.log(allNamesCelebritiesDetail)

    res.render("movies/movie-details.hbs", {
      detailMovie: response,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/:id/delete", async (req, res, next) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

// GET "/movies/:id/edit"
router.get("/:id/edit", async (req, res, next)=>{
  try {
    const response = await Movie.findById(req.params.id)
    const response2 = await Celebrity.find().select({name: 1})
    res.render("movies/edit-movie.hbs", {
      movieToEdit: response,
      allCelebrities: response2
    })
  } catch (error) {
    next(error)    
  }
})

// POST "/movies/:id/edit"
router.post("/:id/edit", async(req, res, next)=>{
  try {
    await Movie.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      genre: req.body.genre,
      plot: req.body.plot,
      cast: req.body.cast
    })
    res.redirect("/movies")
  } catch (error) {
    
  }
})

module.exports = router;
