import mongoose from 'mongoose';

const productsCollection = "products";

const productsSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  code: String,
  stock: Number,
  category: String,
  status: Boolean,
  thumbnails: []
}, {timestamps:{createdAt:'created_at', updatedAt:'updated_at'}});

const productsModel = mongoose.model(productsCollection, productsSchema);


export default productsModel;