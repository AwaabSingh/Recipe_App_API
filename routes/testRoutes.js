const express = require("express");
const { CheckTest } = require("../controllers/testController");
const updateRecipe = require("../controllers/updateRecipe");
const { getAllRecipes } = require("../controllers/getAllRecepieController");
const getSingleRecipe = require("../controllers/getSingleRecipeController")
const { Authenticate } = require("../middlewares/authMiddleware");
const { default: UpdateStep } = require("../controllers/UpdateStepController");

const router = express.Router();

// use the Authenticate middleware to protect routes
router.get("/", getAllRecipes);
router.post("/greet", Authenticate, CheckTest);

// get a single recipe route
router.get("/recipe/:id", getSingleRecipe)

// route to update recipe
router.patch("/recipe/:id", Authenticate, updateRecipe);


//route to update step by _id
router.put("/step/:id", Authenticate, UpdateStep)

module.exports = router;
