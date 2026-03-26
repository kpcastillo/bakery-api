const { Router } = require('express');
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categories');
const { categoryValidationRules, validateCategory } = require('../middleware/validator');

const router = Router();

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);

router.post('/', categoryValidationRules(), validateCategory, createCategory);

router.put('/:id', categoryValidationRules(), validateCategory, updateCategory);

router.delete('/:id', deleteCategory);

module.exports = router;