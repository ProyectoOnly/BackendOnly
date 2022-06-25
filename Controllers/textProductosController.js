const Product = require('../Models/textProductosModel');

const textProductosController = {
    getTextProductos: async (req, res) => {
        const products = await Product.find();
        res.json(products);
    },
  
    addTextProductos: async function(req, res) {
        console.log('Add TextProduct');

        const { title, description, description1, description2, description3, description4, image} = req.body;
        const newProduct = new Product();
        newProduct.title= title;
        newProduct.description = description;
        newProduct.description1= description1;
        newProduct.description2= description2;
        newProduct.description3= description3;
        newProduct.description4= description4;
        newProduct.image = image;
        //newProduct.flagship = false;
        console.log('New Textproduct:', newProduct)

        try {
        const savedProduct = await newProduct.save() 
        res.json(savedProduct);                 
        }catch(error) {
            console.log('Error')
        } ;
    },

  updateTextProductos: async function(req, res) {
        const {id, title, description, description1, description2, description3, description4, image  } = req.body
        //const data = await Producto.findOneAndUpdate({_id: id}, {"$push":{"name":name,"marca":marca}})
        const data = await Product.findOneAndUpdate({_id: id}, { title, description, description1, description2, description3, description4, image }, {new: true})
        res.json(data)
    }, 

 

    deleteTextProductos: async function (req, res) {
        const { _id } = req.body;
    
        const _idToBeDelete = await Product.findOneAndDelete( {_id: _id} );    
            res.status(200).json({
            Product_Eliminado: {
            _idToBeDelete}
        });
        
    },

}

module.exports = textProductosController;