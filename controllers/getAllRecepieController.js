const asyncHandler = require("express-async-handler");

const Recipe = require("../models/Recipe");
/**
 * @desc Get Recepie list
 * @route GET
 * @route /api/getAllRecipes
 * @access Public
 */
const getAllRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.findAll().sort("createdAt");
  if (!recipes) {
    res.status(404);
    throw new Error(`No Recepies found`);
  }

  return res.status(200).json({ recipes });
});

module.exports = {
  getAllRecipes,
};
