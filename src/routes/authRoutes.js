const express = require("express");
const { body } = require("express-validator");
const {
  requestPasswordReset,
  resetPassword,
} = require("../controllers/authController");

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

module.exports = router;
