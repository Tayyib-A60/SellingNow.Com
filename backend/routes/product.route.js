const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer.config');

router.post('/', auth, multer, productController.createProduct);
router.put('/:id', auth, multer, productController.updateProduct);
router.get('/:id', auth, productController.getProduct);
router.get('/', auth, productController.getProducts);
router.delete('/:id', auth, productController.deleteProduct)

module.exports = router;