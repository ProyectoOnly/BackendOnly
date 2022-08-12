const Category = require("../Models/CategoryModels");
const { uploadImage, deleteImage } = require("../utils/cloudinary");
const fs = require("fs");

const categoriesController = {
  getCategories: async function (req, res) {
    const categories = await Category.find().populate("movies");
    console.log(req.query);
    res.send({
      data: categories,
      basePath: process.env.BASE_PATH,
    });
  },

  addCategoryProductos: async function (req, res) {
    console.log("Add Category");

    const { name, description , url} = req.body;
    const newCategory = new Category();
    newCategory.name = name;
    newCategory.description = description;
    newCategory.url = url;
       console.log("New Movies:", newCategory);
    try {
      const savedMovies = await newCategory.save();
      res.json(savedMovies);
    } catch (error) {
      console.log("Error");
    }
    res.json();
  },
};

module.exports = categoriesController;
