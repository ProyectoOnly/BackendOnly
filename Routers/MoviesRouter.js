const express = require('express');
const moviesController = require('../Controllers/Controllers');
const { authenticate } = require('../utils/token')
const { upload } = require("../utils/cloudinary");


const router = express.Router();

router.get('/', moviesController.getMoviesT);
router.post('/' ,authenticate, upload.array('photos', 12), moviesController.addMoviesProductos);

router.get('/category/:categoryId',  moviesController.getMoviesByCategory);
router.get('/profile/:userId',  moviesController.getMoviesByUser);



router.get('/:productId',moviesController.getMoviesById);
router.patch('/:productId', authenticate,moviesController.updateMoviesProductos);
router.delete('/:productId', authenticate,moviesController.deleteMoviesProductos);

module.exports = router;