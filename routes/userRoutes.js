const express = require("express");
const {
  updateProfile,
  resetPassword,
  register,
  forgotPassword,
  login,
  getMe,
  verifyAccount,
} = require("../controllers/userController");
const { authenticate } = require("../middlewares/authMiddleware");
const { upload } = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/confirm/:confirmationCode", verifyAccount);
router.put("/resetpassword/:resettoken", resetPassword);
router.post("/forgotpassword", forgotPassword);
router.get("/me", authenticate, getMe);
router.patch(
  "/me/:id",
  authenticate,
  upload.single("profilephoto"),
  updateProfile
);

module.exports = router;
