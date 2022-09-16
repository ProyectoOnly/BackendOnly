const express = require("express");
const comentaryController = require("../Controllers/ComentaryControllers");
const { authenticate } = require("../utils/token");
const { upload } = require("../utils/cloudinary");

const router = express.Router();

router.get('/', comentaryController.getComentary);

router.post(
  '/:productId',
  authenticate,
  upload.array("photos", 12),
  comentaryController.addComentaryMovies
);
router.get('/:productId', comentaryController.getComentaryById);
router.patch(
  '/:productId',
  authenticate,
  comentaryController.updateCometary
);
router.delete(
  '/:productId',
  authenticate,
  comentaryController.deleteMoviesComentary
);


module.exports = router;
