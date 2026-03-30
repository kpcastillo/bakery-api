const { Router } = require('express');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/products');
const { productValidationRules, validateProduct } = require('../middleware/validator');
const { isAuthenticated } = require('../middleware/authenticate');

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);

router.post('/', isAuthenticated, productValidationRules(), validateProduct, createProduct);

router.put('/:id', isAuthenticated, productValidationRules(), validateProduct, updateProduct);

router.delete('/:id', deleteProduct);

module.exports = router;