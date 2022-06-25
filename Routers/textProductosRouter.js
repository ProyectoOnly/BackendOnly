const express = require('express');
const textproductsController = require('../Controllers/textProductosController');

const router = express.Router();

router.get('/', textproductsController.getTextProductos);
router.post('/', textproductsController.addTextProductos);
router.delete('/', textproductsController.deleteTextProductos);
router.patch('/', textproductsController.updateTextProductos)

module.exports = router;