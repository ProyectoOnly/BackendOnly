const categoriesController = require("../Controllers/CategoryControllers");
const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.get("/", categoriesController.getCategories);
router.post(
  "/",
  upload.single("avatar"),
  categoriesController.addCategoryProductos
);

module.exports = router;
