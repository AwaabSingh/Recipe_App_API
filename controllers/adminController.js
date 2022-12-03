const asyncHandler = require('express-async-handler');
const Recipe = require('../models/Recipe');
const User = require('../models/User');

/**
 * @desc Create a user
 * @route POST
 * @route /api/v1/admin/user
 * @access Public
 */
exports.createUser = asyncHandler(async (req, res) => {
	const { fullname, username, email, password } = req.body;

	const exisitingUser = await User.findOne({ email });

	if (exisitingUser) {
		res.status(400);
		throw new Error('User  already Exists');
	}

	const user = await User.create({
		fullname,
		username,
		email,
		password,
		status: true,
	});

	res.status(201).json({
		_id: user._id,
		fullname: user.fullname,
		email: user.email,
	});
});

/**
 * @desc Update user
 * @route PUT
 * @route /api/user/:id
 * @access Private/Admin
 */
exports.UpdateUserByAdmin = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (user) {
		user.fullname = req.body.fullname || user.fullname;
		user.username = req.body.username || user.username;
		user.isAdmin = req.body.isAdmin;

		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

/**
 * @desc Delete user
 * @route DELETE
 * @route /api/user/:id
 * @access Private/Admin
 * */
// delete user
exports.deleteUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (user) {
		await user.remove();
		res.status(200).json({ message: 'User removed' });
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

/**
 * @desc Add a recipe by Admin
 * @route Post
 * @route api/v1/recipe
 * @access Private
 */
exports.createRecipeByAdmin = asyncHandler(async (req, res) => {
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
			premiumStatus,
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

/**
 * @desc Get Recepie list
 * @route GET
 * @route /api/getAllRecipes
 * @access Public
 */
exports.getAllRecipes = asyncHandler(async (req, res) => {
	try {
		const recipes = await Recipe.find().populate('author', 'username');
		if (!recipes) {
			res.status(404);
			throw new Error(`No Recepies found`);
		}

		res.status(200).json(recipes);
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

exports.deleteRecipe = asyncHandler(async (req, res) => {
	try {
		const recipe = await Recipe.findById(req.params.id);

		if (!recipe) {
			res.status(400);
			throw new Error('Recipe is not found');
		}

		//  check for user
		if (req.user.isAdmin === false) {
			res.status(401);
			throw new Error('User not authorized to delete recipe');
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


exports.updateRecipe = asyncHandler(async (req, res) => {
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