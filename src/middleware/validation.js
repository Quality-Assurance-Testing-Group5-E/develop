const { body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const registerValidation = [
  body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email').isEmail().withMessage('Valid email required'),
  body('fullName').notEmpty().withMessage('Full name required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  validate
];

const loginValidation = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password required'),
  validate
];

const updateValidation = [
  body('fullName').optional().isLength({ min: 2 }),
  body('email').optional().isEmail(),
  body('password').optional().isLength({ min: 6 }),
  validate
];

module.exports = { registerValidation, loginValidation, updateValidation };