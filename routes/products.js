const { Router } = require('express');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/products');
const { productValidationRules, validateProduct } = require('../middleware/validator');

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);

router.post('/', productValidationRules(), validateProduct, createProduct);

router.put('/:id', productValidationRules(), validateProduct, updateProduct);

router.delete('/:id', deleteProduct);

module.exports = router;