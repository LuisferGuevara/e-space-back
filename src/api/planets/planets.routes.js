const express = require("express");
const Planet = require("./planets.model");
const upload = require("../middlewares/file");
const { deleteFile } = require("../../api/middlewares/deleteFile");
const { isAuth, isAdmin } = require("../../api/middlewares/auth");
const router = express.Router();
require("dotenv").config();

router.get("/", async (req, res, next) => {
  try {
    const allPlanets = await Planet.find().lean();
    return res.status(200).json(allPlanets);
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", [isAuth], async (req, res, next) => {
  try {
    const id = req.params.id;
    const planetToFind = await Planet.findById(id);
    return res.status(200).json(planetToFind);
  } catch (error) {
    return next(error);
  }
});
router.get('/getbyname/:name', async (req, res, next) => {
  try {
    const name = req.params.name;
    const architectureToFind = await Planet.findOne({name: name});
    return res.status(200).json(architectureToFind);
  } catch (error) {
    return next(error);
  }
});

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const planet = req.body;
    if (req.file) {
      planet.image = req.file.path;
    }
    const newPlanet = new Planet(planet);
    const planetCreated = await newPlanet.save();
    return res.status(200).json(planetCreated);
  } catch (error) {
    return res
      .status(500)
      .json("Error creating planet");
  }
});

router.put("/edit/:id", upload.single("image"), async (req, res, next) => {
  try {
    const id = req.params.id;
    const planet = req.body;
    const planetToEdit = await Planet.findById(id);
    if (req.file) {
      if (planetToEdit.image) {
        deleteFile(planetToEdit.image);
      }
      planet.image = req.file.path;
    }
    const planetModification = new Planet(planet);
    planetModification._id = id;
    const planetModificated = await Planet.findByIdAndUpdate(
      id,
      planetModification,
      {returnOriginal:false}
    );
    return res.status(200).json({
      mensaje: "Planet modified!",
      planetModificated: planetModificated,
    });
  } catch (error) {
    return next(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const planetToDelete = await Planet.findByIdAndDelete(id);
    return res.status(200).json("Planet deleted");
  } catch (error) {
    return res.status(500).json("Error deleting planet");
  }
});

module.exports = router;
