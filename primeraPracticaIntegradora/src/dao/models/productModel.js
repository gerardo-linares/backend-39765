
  const mongoose = require('mongoose');

  const productSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    code: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    status: {
      type: Boolean,
      required: true
    },
    stock: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    thumbnails: [{
      type: String,
      required: true
    }]
  });
  
  const Product = mongoose.model('Product', productSchema);
  

