const Movies = require("../Models/MoviesModels");
const { uploadImage, deleteImage } = require("../utils/cloudinary");
const fs = require("fs");

const MoviesController = {

    getMovies: async (req, res) => {
        const movies = await Movies.find()
        res.json(movies);
      },

  getMoviesT: async (req, res) => {
    let featured = req.query.featured;
    let perPage = 20;
    let page = req.query.page || 1;
    const movies = await Movies.find({ featured })
      .skip(perPage * page - perPage) // en la primera pág, se saltarían 0 elementos para que salgan los primeros?
      .limit(perPage); // para que solo muestre 25 elementos por página
    res.json(movies);
  },

  addMoviesProductos: async function (req, res) {

    if (!res.locals.userId) {
        return res.status(404).json({
          error: "user not found",
        });
      }
      const imagens = [];
      console.log("esto pinta imagens", imagens);
      for (let i = 0; i < req.files.length; i++) {
        try {
          const result = await uploadImage(req.files[i].path);
          imagens.push(result.url);
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

    const { title, gender, time, date, description, actor, director } =
      req.body;
    const newMovies = new Movies();
    newMovies.user = res.locals.userId;
    newMovies.title = title;
    newMovies.gender = gender;
    newMovies.time = time;
    newMovies.date = date;
    newMovies.description = description;
    newMovies.image = imagens;
    newMovies.actor = actor;
    newMovies.director = director;
    console.log("New Movies:", newMovies);

    try {
      const savedMovies = await newMovies.save();
      res.json(savedMovies);
    } catch (error) {
      console.log("Error");
    }
    res.json();
  },

  updateMoviesProductos: async function (req, res) {
    const { productId } = req.params;
    const productUser = await Movies.findById(productId);
    if (productUser === null) {
      return res.status(404).json({
        error: "Object not found",
      });
    } else {
      const { productId } = req.params;
      const productUser = await Movies.findById(productId);
      if (productUser.user !== res.locals.userId) {
        return res.status(404).json({
          error: "Invalid user ID",
        });
      }
      const { title, gender, time, fecha, description, imagens, actor, director } =
        req.body;
      const updateProductById = await Movies.findByIdAndUpdate(
        productId,
        { title, gender, time, fecha, description, imagens, actor, director },
        { new: true }
      );
      res.json(updateProductById);
    }
  },

  deleteMoviesProductos: async function (req, res) {
    const { productId } = req.params;
    const productUser = await Movies.findById(productId);
    if (productUser === null) {
      return res.status(404).json({
        error: "Object not found",
      });
    } else {
      if (productUser.user !== res.locals.userId) {
        return res.status(404).json({
          error: "Invalid user ID",
        });
      }
      const MoviesToBeDelete = await Movies.findByIdAndDelete(productId);
      await deleteImage(MoviesToBeDelete.images)

      res.status(200).json({
        Product_Deleted: {
          MoviesToBeDelete,
        },
      });
    }
  
  },


  getMoviesById: async function (req, res) {
    const { productId } = req.params;
    try {
      const searchProduct = await Movies.findById(productId);
      console.log(searchProduct);
      res.json(searchProduct);
    } catch (error) {
      return res.status(404).json({
        error: "Product not found",
      });
    }
  },

  getMoviesByCategory: async function (req, res) {
    const { categoryId } = req.params;
    try {
      const movies = await Movies.find({ categoryId: categoryId });
      let filterCategory = [];
      for (let i = 0; i < movies.length; i++) {
        if (movies[i].categoryId === categoryId)
          filterCategory.push(movies[i]);
      }
      res.json(filterCategory);
    } catch (error) {
      console.log("no_products_in_this_category");
    }
  },
  getMoviesByUser: async function (req, res) {
    const { userId } = req.params;
    try {
      const movies = await Movies.find();
      let filterUser = [];
      for (let i = 0; i < movies.length; i++) {
        if (movies[i].user === userId) filterUser.push(movies[i]);
      }

      res.json(filterUser);
    } catch (error) {
      console.log("this user has no products");
    }
  },


};

module.exports = MoviesController;
