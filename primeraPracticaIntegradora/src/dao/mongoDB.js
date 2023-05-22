const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://geracoder:123@cluster10.0mmfpad.mongodb.net/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('Error connecting to MongoDB Atlas:', error));

const Cart = require('./models/cartModel');
const Message = require('./models/messageModel');
const Product = require('./models/productModel');

module.exports = {
  Cart,
  Message,
  Product,
};
