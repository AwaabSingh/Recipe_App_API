const express = require('express');
const {
	getPublishedRecipes,
	createRecipe,
	getRecipe,
	updateRecipe,
	deleteRecipe,
	isPublished,
	voteRecipe,
	printRecipe,
	userRecipes,
	publishPremiumRecipe,
	getPublishPremiumRecipes,
	getMyPremiumRecipe,
	highestVoteRecipe,
	getPremiumRecipes,
	getPurchasedRecipes,
} = require('../controllers/RecipeController');
const { authenticate, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/premium-recipes', getPremiumRecipes);
router.get('/', getPublishedRecipes);
router.get('/purchased-recipes', authenticate, getPurchasedRecipes);
router.get('/premium-recipe', authenticate, getPremiumRecipes); //worked on
router.get('/myrecipe', authenticate, userRecipes);
router.get('/highest-vote', authenticate, highestVoteRecipe);
router.get('/mypremium-recipe', authenticate, getMyPremiumRecipe); //worked on
router.get('/:id', getRecipe);
router.put('/:id', authenticate, updateRecipe);
router.post('/', authenticate, createRecipe);
router.delete('/:id', authenticate, deleteRecipe);
router.get('/:id/print', authenticate, printRecipe);
router.patch('/:id/publish', authenticate, isPublished);
router.patch('/:id/vote', authenticate, voteRecipe);

module.exports = router;
