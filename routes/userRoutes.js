const express = require("express");
const { updateProfile, resetPassword, register, forgotPassword, login, getMe } = require("../controllers/userController");
const { authenticate } = require("../middlewares/authMiddleware");



const router = express.Router();


router.post("/register",  register);
router.post("/login",  login);
router.get('/me', authenticate, getMe)
router.patch("/me", authenticate, updateProfile);
router.put('/resetpassword/:resettoken', resetPassword)
router.post('/forgotpassword', forgotPassword);


module.exports = router;
