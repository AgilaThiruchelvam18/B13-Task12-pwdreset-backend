const express = require("express");
const { body,check, validationResult } = require("express-validator");
const {
  requestPasswordReset,
  resetPassword,
  getUserProfile,
  login,register
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/request-password-reset",
  body("email").isEmail().withMessage("Enter a valid email"),
  requestPasswordReset
);

router.post(
  "/reset-password/:token",
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  resetPassword
);

const registerValidation = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password must be at least 6 characters long").isLength({ min: 6 }),
];

const loginValidation = [
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").not().isEmpty(),
];

router.post("/register", registerValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  register(req, res);
});

router.post("/login", loginValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  login(req, res);
});

router.get("/profile", authMiddleware, getUserProfile);

module.exports = router;
