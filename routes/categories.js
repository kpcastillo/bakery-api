const { Router } = require('express');
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categories');
const { categoryValidationRules, validateCategory } = require('../middleware/validator');
const { isAuthenticated } = require('../middleware/authenticate');

const router = Router();

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);

router.post('/', isAuthenticated, categoryValidationRules(), validateCategory, createCategory);

router.put('/:id', isAuthenticated, categoryValidationRules(), validateCategory, updateCategory);

router.delete('/:id', isAuthenticated, deleteCategory);

module.exports = router;