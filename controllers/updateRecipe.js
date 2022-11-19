require("express-async-handler");

const Recipe = require("../models/Recipe");

const updateRecipe = async (req, res) => {
  // take the id of the recipe from the api route of the request

  const { id } = req.params;

  if (!id) {
    res.status(400);
    throw new Error(`there is no id present in the route `);
  }

  // the items to update are present in the body

  const recipe = await Recipe.findOneAndUpdate({ id }, body, {
    new: true,
    runValidators: true,
  });

  if (!recipe) {
    res.status(400);
    throw new Error(`couldn't update recipe with id : ${id}`);
  }

  return res.status(200).json({ recipe });
};

module.exports = updateRecipe;
