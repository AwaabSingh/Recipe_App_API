const asyncHandler = require('express-async-handler');
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const { buildPDF } = require('../utils/pdf-service');

/**
 * @desc Get Recepie list
 * @route GET
 * @route /api/getAllRecipes
 * @access Public
 */
const getPublishedRecipes = asyncHandler(async (req, res) => {
	try {
		const recipes = await Recipe.find().populate('author', 'username');
		if (!recipes) {
			res.status(404);
			throw new Error(`No Recepies found`);
		}

		const publishedRecipe = recipes.filter(
			(recipe) => recipe.isPublished === true
		);

		if (!publishedRecipe) {
			res.status(200).json({ msg: 'No Published Recipe yet' });
		}

		res.status(200).json(publishedRecipe);
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

/**
 * @desc Add a recipe
 * @route Post
 * @route api/v1/recipe
 * @access Private
 */
const createRecipe = asyncHandler(async (req, res) => {
	//  Get user id and add to the body field
	try {
		req.body.user = req.user.id;

		const {
			title,
			description,
			utensils,
			user,
			ingredients,
			steps,
			images,
			coverImage,
			preparationTime,
			yield,
			difficulty,
			templateId,
			price,
			status,
			calories,
			premiumStatus,
			howToServe,
			servedWith,
			isPurchased,
		} = req.body;

		const recipe = await Recipe.create({
			title,
			author: user,
			images,
			description,
			utensils,
			ingredients,
			steps,
			status,
			price,
			coverImage,
			preparationTime,
			yield,
			difficulty,
			templateId,
			premiumStatus,
			isPurchased,
			calories,
			howToServe,
			servedWith,
		});

		if (recipe) {
			const createdRecipe = await recipe.save();
			res.status(201).json(createdRecipe);
		}
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

const getRecipe = asyncHandler(async (req, res) => {
	try {
		const { id: recipeID } = req.params;
		const recipe = await Recipe.findOne({ _id: recipeID }).populate(
			'author',
			'username'
		);
		if (!recipe) {
			res.status(404);
			throw new Error(`No recipe with id : ${recipeID}`);
		}

		return res.status(200).json({ recipe });
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

const updateRecipe = asyncHandler(async (req, res) => {
	try {
		const recipe = await Recipe.findById(req.params.id);

		if (!recipe) {
			res.status(400);
			throw new Error('Recipe not found');
		}

		if (!req.user) {
			req.status(401);
			throw new Error('User not found');
		}

		// check for owner Recipe
		if (recipe.author.toString() !== req.user.id) {
			res.status(401);
			throw new Error('User not authorized');
		}
		const updaterecipe = await Recipe.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);

		res.status(200).json(updaterecipe);
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

const deleteRecipe = asyncHandler(async (req, res) => {
	try {
		const recipe = await Recipe.findById(req.params.id);

		if (!recipe) {
			res.status(400);
			throw new Error('Recipe is not found');
		}

		//  check for user
		if (!req.user) {
			res.status(401);
			throw new Error('User not authorized');
		}

		// Check for owner recipe
		if (recipe.author.toString() !== req.user.id) {
			res.status(401);
			throw new Error('User not authorized');
		}
		await recipe.remove();

		res
			.status(200)
			.json({ id: req.params.id, msg: 'Recipe Deleted Successfully' });
	} catch (error) {
		res.status(500);
		throw new Error(error.message);
	}
});

const isPublished = asyncHandler(async (req, res) => {
	try {
		const recipe = await Recipe.findById(req.params.id);

		if (!recipe) {
			res.status(400);
			throw new Error('Recipe is not found');
		}

		//  check for user
		if (!req.user) {
			res.status(401);
			throw new Error('User not authorized');
		}

		// Check for owner recipe
		if (recipe.author.toString() !== req.user.id) {
			res.status(401);
			throw new Error('User not authorized');
		}

		if (recipe.status === 'free') {
			recipe.isPublished = !recipe.isPublished;
		} else {
			res.status(401);
			throw new Error('User not authorized to publish premium recipe');
		}
		await recipe.save();

		return res.status(200).json({
			isPublished: recipe.isPublished,
			msg: 'Your Recipe has been Published Successfully',
		});
	} catch (error) {
		res.status(500);
		throw new Error(error.message);
	}
});

const voteRecipe = asyncHandler(async (req, res) => {
	try {
		const recipe = await Recipe.findById(req.params.id);

		if (!recipe) {
			res.status(400);
			throw new Error('Recipe is not found');
		}

		//  check for user
		if (!req.user) {
			res.status(401);
			throw new Error('User not authorized');
		}

		const index = recipe.votes.findIndex((id) => id === String(req.user.id));

		if (index === -1) {
			recipe.votes.push(req.user.id);
		} else {
			recipe.votes = recipe.votes.filter((id) => id !== String(req.user.id));
		}

		await recipe.save();

		res.status(200).json(recipe);
	} catch (error) {
		res.status(500);
		throw new Error(error.message);
	}
});

const printRecipe = asyncHandler(async (req, res) => {
	try {
		const { id: recipeID } = req.params;
		const recipe = await Recipe.findOne({ _id: recipeID });
		if (!recipe) {
			res.status(404);
			throw new Error(`No recipe with id : ${recipeID}`);
		}

		return res.status(200).json({ recipe });
	} catch (error) {
		res.status(500);
		throw new Error(error.message);
	}
});

const userRecipes = asyncHandler(async (req, res) => {
	try {
		// Get user id
		const userId = req.user.id;
		recipe = await Recipe.find({ author: userId }).populate(
			'author',
			'username'
		);
		// check if user exit
		if (!req.user) {
			req.status(401);
			throw new Error('User not found');
		}
		// Check for user recipe
		if (!recipe) {
			res.status(404);
			throw new Error(`No recipe for this userId : ${userId}`);
		}
		return res.status(200).json(recipe);
	} catch (error) {
		res.status(500);
		throw new Error(error.message);
	}
});

const highestVoteRecipe = asyncHandler(async (req, res) => {
	try {
		const recipes = await Recipe.find().populate('author', 'username');

		if (!recipes) {
			res.status(404);
			throw new Error(`No Recepies found`);
		}
		// sort the array base on the highest vote
		recipes.sort(function (a, b) {
			return b.votes.length - a.votes.length;
		});

		res.status(201).json(recipes);
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

const getPublishPremiumRecipes = asyncHandler(async (req, res) => {
	const recipes = await Recipe.find();

	recipes.map((recipe) => {
		if (recipe.premiumStatus === true) {
			return res.status(200).json(recipes);
		} else {
			res.status(200).json({ msg: 'No Premium Recipe Published yet' });
		}
	});

	res.status(400);
	throw new Error('Error getting Published Premium Recipe ');
});

const getMyPremiumRecipe = asyncHandler(async (req, res) => {
	try {
		// Get user id
		const userId = req.user.id;
		recipes = await Recipe.find({ author: userId }).populate(
			'author',
			'username'
		);
		// check if user exit
		if (!req.user) {
			req.status(401);
			throw new Error('User not found');
		}

		// Check for owner recipe
		if (recipes.author.toString() !== req.user.id) {
			res.status(401);
			throw new Error('User not authorized');
		}

		recipes.map((recipe) => {
			if (recipe.status === 'premium') {
				return res.status(200).json(recipes);
			}
		});
	} catch (error) {
		res.status(500);
		throw new Error(error.message);
	}
});

//Get All Premium Recipes
const getPremiumRecipes = asyncHandler(async (req, res) => {
	const recipes = await Recipe.find();

	const publishedRecipe = recipes.filter(
		(recipe) => recipe.status === 'premium'
	);

	if (!publishedRecipe) {
		res.status(200).json({ msg: 'No Published Recipe yet' });
	}

	res.status(200).json(publishedRecipe);
});

//Get Purchased Recipes
const getPurchasedRecipes = asyncHandler(async (req, res) => {
	try {
		const recipes = await Recipe.find({
			isPurchased: true,
			author: req.user.id,
		});

		
			return res.status(200).json(recipes);
		
	} catch (error) {
		res.json(400);
		throw new Error(error.message);
	}
});

module.exports = {
	getPublishedRecipes,
	createRecipe,
	getRecipe,
	updateRecipe,
	deleteRecipe,
	isPublished,
	voteRecipe,
	printRecipe,
	userRecipes,
	getPublishPremiumRecipes,
	getMyPremiumRecipe,
	highestVoteRecipe,
	getPremiumRecipes,
	getPurchasedRecipes,
	getPremiumRecipes,
};
