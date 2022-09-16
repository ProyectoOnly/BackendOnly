const mongoose = require("mongoose");
const User = require("../Models/UsersModels");
const { getToken } = require("../utils/token");
const { uploadImage } = require("../utils/cloudinary");
const fs = require("fs");
const { MongoUnexpectedServerResponseError } = require("mongodb");
const userController = {
  getUsers: async function (req, res) {
    const users = await User.find();

    res.json(users);
  },

  loginUser: async function (req, res) {
    const { email, password } = req.body;

    const searchEmail = await User.findOne({ email: email });
    console.log(searchEmail);

    if (!searchEmail) {
      return res.status(404).json({
        error: "user_not_found",
      });
    }
    if (password === searchEmail.password) {
      return res.json({
        token: getToken(searchEmail._id),

        id: searchEmail._id,
        name: searchEmail.name,
        surname1: searchEmail.surname1,
        surname2: searchEmail.surname2,
        email: searchEmail.email,
      });
    }
    res.json("wrong_password");
  },

  addUserImage: async function (req, res) {
    const { userId } = req.params;

    const images = [];
    const userFound = await User.findById(userId);
    if (userFound == null) {
      return res.status(404).json({
        error: "user not found",
      });
    }
    console.log(userFound);
    for (let i = 0; i < req.files.length; i++) {
      try {
        const result = await uploadImage(req.files[i].path);
        images.push(result.url);
        fs.unlink(req.files[i].path, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    }
    const userToBeUpdated = await User.findByIdAndUpdate(
      userId,
      { images },
      { new: true }
    );
    console.log(userToBeUpdated);
  },

  registerUser: async function (req, res) {
    const { name, surname1, surname2, email, password } = req.body;

    const images = [];
    console.log("esto pinta imagens", images);
    for (let i = 0; i < req.files.length; i++) {
      try {
        const result = await uploadImage(req.files[i].path);
        images.push(result.url);
        fs.unlink(req.files[i].path, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    }

    const newUser = new User();
    newUser.name = name;
    newUser.surname1 = surname1;
    newUser.surname2 = surname2;
    newUser.email = email;
    newUser.password = password;
    newUser.images = images;

    try {
      const savedUser = await newUser.save();
      res.json(savedUser);
    } catch (error) {
      console.log("Error");
    }
    res.json();
  },

  deleteUser: async function (req, res) {
    const { email } = req.body;

    const userToBeDelete = await User.findOneAndDelete({ email: email });
    res.status(200).json({
      User_Deleted: {
        userToBeDelete,
      },
    });
  },
  
  updateLikesProduct: async function (req, res) {
    const { productId } = req.body;
    const userId = res.locals.userId;
    const user = await User.findOne({ _id: userId });

    try {
      if (!user) return;
      if (user.likesProduct && user.likesProduct.includes(productId)) {
        user.likesProduct = user.likesProduct.filter((id) => id !== productId);
      } else {
        user.likesProduct.push(productId);
      }
      user.save();
      res.json(user);
    } catch {
      return res.status(404).json({
        error: "not likes",
      });
    }
  },

  updateUser: async function (req, res) {
    const { name, surname1, surname2, email} =req.body;
    const {userId} = req.params;
    const userToBeUpdated = await User.findByIdAndUpdate(
      userId,
      { name,surname1, surname2, email},
      { new: true }
    );
    res.json(userToBeUpdated)
    
  },

  getUserId: async function (req, res) {
    const { userId } = req.params;
    try {
      const searchUser = await User.findById(userId);
      console.log(searchUser);
      res.json(searchUser);
    } catch (error) {
      return res.status(404).json({
        error: "User not found",
      });
    }
  },
};

module.exports = userController;
