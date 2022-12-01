const express = require('express');
const { createUser } = require('../controllers/adminController');
const { authenticate, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create-user', authenticate, admin, createUser);
module.exports = router;
