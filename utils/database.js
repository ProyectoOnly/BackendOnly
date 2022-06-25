const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.MATLAS_USER}:${process.env.MATLAS_PASS}@cluster0.fkz8n.mongodb.net/ecommerce?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(x => { 
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

 
  module.exports = mongoose;

  