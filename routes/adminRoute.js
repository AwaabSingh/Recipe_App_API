const express = require('express');
const {
	createUser,
	UpdateUserByAdmin,
    deleteUser,
    createRecipeByAdmin,
} = require('../controllers/adminController');
const { authenticate, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create-user', authenticate, admin, createUser);
router.put('/update-user/:id', authenticate, admin, UpdateUserByAdmin);
router.delete('/delete-user/:id', authenticate, admin, deleteUser);
router.post('/create-recipe', authenticate, admin, createRecipeByAdmin);

module.exports = router;
