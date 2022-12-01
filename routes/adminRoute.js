const express = require('express');
const { createUser, UpdateUserByAdmin } = require('../controllers/adminController');
const { authenticate, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create-user', authenticate, admin, createUser);
router.put('/update-user/:id', authenticate, admin, UpdateUserByAdmin);
module.exports = router;
