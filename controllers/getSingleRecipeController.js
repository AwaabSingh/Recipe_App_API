const asyncHandler =  require('express-async-handler');

const Recipe = require('../models/Recipe');

const getSingleRecipe = asyncHandler(async (req, res) => {
    const { id: recipeID } = req.params
    const recipe = await Recipe.findOne({ _id: recipeID })
    if (!recipe) {
        res.status(404)
      throw new Error (`No recipe with id : ${recipeID}`);
    }
  
    return res.status(200).json({ recipe })
  });

  module.exports = {
    getSingleRecipe
  };