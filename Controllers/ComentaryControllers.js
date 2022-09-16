const Comentary = require("./../Models/Comentarymodels");
const User = require("../Models/UsersModels");
const Movies = require("../Models/MoviesModels");
const { uploadImage, deleteImage } = require("../utils/cloudinary");
const fs = require("fs");
const ComentaryController = {
  getComentaryTotal: async (req, res) => {
    const comentary = await Comentary.find();
    res.json(comentary);
  },

  getComentary: async (req, res) => {
    let perPage = 20;
    let page = req.query.page || 1;
    const comentary = await Comentary.find()
      .skip(perPage * page - perPage) // en la primera pág, se saltarían 0 elementos para que salgan los primeros?
      .limit(perPage); // para que solo muestre 25 elementos por página
    res.json(comentary);
  },
 

  addComentaryMovies: async (req, res) => {
    if (!res.locals.userId) {
      return res.status(404).json({
        error: "user not found",
      });
    }
    const imagens = [];
    for (let i = 0; i < req.files.length; i++) {
      try {
        const result = await uploadImage(req.files[i].path);
       
        imagens.push({
          Url: result.url,
          PublicId: result.public_id,
        });
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

    const { productId } = req.params;
    const userId = res.locals.userId;
    const valueUser = await User.findById(userId);
    const valueTime = Date();

    const { description } = req.body;
    const newComentary = new Comentary();
    newComentary.User = res.locals.userId;
    newComentary.nameUser = valueUser.name;
    newComentary.time = valueTime;
    newComentary.image = imagens;
    newComentary.description = description;
    newComentary.productIdComen = productId;
    console.log("New Comentary", newComentary);

    try {
      const savedComentary = await newComentary.save();
      res.json(savedComentary);

      const userToBeUpdated = await Movies.findById(productId);

      let array = [];
      let comentary = userToBeUpdated.comentary;
      array = comentary.push(newComentary._id);

      const updateMoviesById = await Movies.findByIdAndUpdate(
        productId,
        { comentary },
        { new: true }
      );
      
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
    res.json();
  },

  deleteMoviesComentary: async function (req, res) {
    const { productId } = req.params;
    const productUser = await Comentary.findById(productId);
    if (productUser === null) {
      return res.status(404).json({
        error: "Object not found",
      });
    } else {
      if (productUser.User !== res.locals.userId) {
        return res.status(404).json({
          error: "Invalid user ID",
        });
      }
      for (let i = 0; i < productUser.image.length; i++) {
        await deleteImage(productUser.image[i].PublicId);
      }
      const MoviesToBeDelete = await Movies.findByIdAndDelete(productId);

      res.status(200).json({
        Product_Deleted: {
          MoviesToBeDelete,
        },
      });
    }
  },

  getComentaryById: async function (req, res) {
    const { productId } = req.params;
    try {
      const searchProductResult = await Comentary.findById(productId);
      const images = [];
      const searchProduct = searchProductResult.toJSON();
      for (let i = 0; i < searchProduct.image.length; i++) {
        images.push(searchProduct.image[i].Url);
      }
      searchProduct.images = images;

   /*    console.log(searchProduct); */
      res.json(searchProduct);
    } catch (error) {
      return res.status(404).json({
        error: "Product not found",
      });
    }
  },

  updateCometary: async function (req, res) {
    const { productId } = req.params;
    const productUser = await Movies.findById(productId);
    if (productUser === null) {
      return res.status(404).json({
        error: "Object not found",
      });
    } else {
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
        const { description } = req.body;
        const updateProductById = await Movies.findByIdAndUpdate(
          productId,
          { description },
          { new: true }
        );
        res.json(updateProductById);
      }
    }
  },
};

module.exports = ComentaryController;
