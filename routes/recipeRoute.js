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
} = require('../controllers/RecipeController');
const { authenticate, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getPublishedRecipes);
router.get('/premium-recipe', getPublishPremiumRecipes); //worked on
router.get('/myrecipe', authenticate, userRecipes);
router.get('/mypremium-recipe', authenticate, getMyPremiumRecipe); //worked on
router.get('/:id', getRecipe);
router.put('/:id', authenticate, updateRecipe);
router.post('/', authenticate, createRecipe);
router.delete('/:id', authenticate, deleteRecipe);
router.delete('/:id/print', authenticate, printRecipe);
router.patch('/:id/publish', authenticate, isPublished);
router.patch('/:id/vote', authenticate, voteRecipe);
router.patch('/:id/publish-premium', authenticate, admin, publishPremiumRecipe); //worked on

module.exports = router;
