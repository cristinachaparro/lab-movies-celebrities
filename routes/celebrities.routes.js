const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity.model.js")

//rutas
// GET "/celebrities/create"
router.get("/create",(req, res, next)=>{
  res.render("celebrities/new-celebrity.hbs")
})

// POST "/celebrities/create"
router.post("/create", async (req, res, next)=>{
  const { name, occupation, catchPhrase } = req.body
  try {
    await Celebrity.create({
      name,
      occupation,
      catchPhrase
    })
    console.log(req.body)
    res.redirect("/")
  } catch (error) {
    next(error)
  }
})

module.exports = router;
