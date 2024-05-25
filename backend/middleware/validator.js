import { check, validationResult } from "express-validator";

// Validator for name, email, and password
const validateNameEmailPassword = [
  check("name").trim().not().isEmpty().withMessage("Username is missing"),

  check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email address")
    .not()
    .isEmpty()
    .withMessage("Email is required"),

  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please enter a valid password")
    .isLength({ min: 6, max: 16 })
    .withMessage("Password must be at least 6 to 16 characters long"),
];

// validator for email and password
const validateEmailPassword = [
  check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email address")
    .not()
    .isEmpty()
    .withMessage("Email is required"),

  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please enter a valid password")
    .isLength({ min: 6, max: 16 })
    .withMessage("Password must be at least 6 to 16 characters long"),
];

// Validator for email only
const validateEmailOnly = [
  check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email address")
    .not()
    .isEmpty()
    .withMessage("Email is required"),
];

const validateResetPassword = [
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is missing")
    .isLength({ min: 6, max: 16 })
    .withMessage("Password must be of 6 to 16 characters"),
  check("newPassword")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is missing")
    .isLength({ min: 6, max: 16 })
    .withMessage("Password must be of 6 to 16 characters"),
];

const actorInfoValidator = [
  check("actorName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Actor name is missing"),

  check("about").trim().not().isEmpty().withMessage("About is missing"),

  check("gender").trim().not().isEmpty().withMessage("Gender is missing"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export {
  validateNameEmailPassword,
  validateEmailOnly,
  validateResetPassword,
  validateEmailPassword,
  actorInfoValidator,
  validate,
};
