const express = require('express');
const {
	createUser,
	UpdateUserByAdmin,
	deleteUser,
	createRecipeByAdmin,
	getAllRecipes,
	publishPremiumRecipe,
	deleteRecipe,
    updateRecipe,
} = require('../controllers/adminController');
const { authenticate, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create-user', authenticate, admin, createUser);
router.put('/update-user/:id', authenticate, admin, UpdateUserByAdmin);
router.delete('/delete-user/:id', authenticate, admin, deleteUser);
router.post('/create-recipe', authenticate, admin, createRecipeByAdmin);
router.delete('/delete-recipe/:id', authenticate, admin, deleteRecipe);
router.put('/update-recipe/:id', authenticate, admin, updateRecipe);
router.get('/allRecipes', authenticate, admin, getAllRecipes);
router.put('/publish-recipe/premium/:id', authenticate, admin, publishPremiumRecipe);



module.exports = router;
