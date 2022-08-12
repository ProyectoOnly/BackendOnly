const cloudinary =require ('cloudinary')
const multer  = require('multer')
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_CLOUD_KEY, 
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
  secure: true
})
const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
        folder: "proyectOnly",
  })
}

const deleteImage = async (publicId) => {
  return await cloudinary.uploader.destroy(publicId)
}


  const upload = multer({ dest: 'uploads/' });

module.exports = {deleteImage, uploadImage, upload}