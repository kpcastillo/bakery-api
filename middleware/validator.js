const { body, validationResult } = require('express-validator')

const productValidationRules = () => {
    return [
        body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
        body('category').matches(/^[a-fA-F0-9]{24}$/).withMessage('Category must be a valid ObjectId'),
        body('flavor').isLength({ min: 3 }).withMessage('Flavor must be at least 3 characters long'),
        body('price').isFloat({ gt: 0 }).withMessage('Price must be a number greater than 0'),
        body('size').isIn(['Small', 'Medium', 'Large']).withMessage('Size must be one of: Small, Medium, Large'),
        body('description').optional().isLength({ min: 10 }).withMessage('Description must be at least 10 characters long if provided'),
        body('available').isBoolean().withMessage('Available must be a boolean value'),
        body('stock').isInt({ gt: -1 }).withMessage('Stock must be an integer greater than or equal to 0'),

    ]
}
const validateProduct = (req, res, next) => {
    const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

const categoryValidationRules = () => {
    return [
        body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
        body('description').optional().isLength({ min: 10 }).withMessage('Description must be at least 10 characters long if provided'),
    ]
}
const validateCategory = (req, res, next) => {
    const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

const userValidationRules = () => {
  return [
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('username').isEmail(),
    body('email').isEmail(),
    body('position').isLength({ min: 2 }).withMessage('Position must be at least 2 characters long'),
    body('password').isLength({ min: 5 }),
  ]
}

const validateUser = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}
module.exports = {
    productValidationRules,
    validateProduct,
    userValidationRules,
    validateUser,
    categoryValidationRules,
    validateCategory
}