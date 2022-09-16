const express = require('express');
const userController = require('../Controllers/Userscontrollers');
const { authenticate } = require('../utils/token')
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

//router.get('/:id', userController.getUsers);
router.get("/", userController.getUsers);
router.post("/register", upload.array('photos', 12), userController.registerUser);
router.post("/login", userController.loginUser);
router.post('/:userId/images' , authenticate,upload.array('photos', 12), userController.addUserImage);
router.delete("/", authenticate,userController.deleteUser);
router.patch("/:userId", authenticate,userController.updateUser);
router.get("/:userId", userController.getUserId);
router.post("/updatelikes", authenticate,userController.updateLikesProduct);


module.exports = router;
