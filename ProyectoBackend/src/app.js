import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import dotenv  from 'dotenv'

import viewsRouter from './routes/views.router.js'
import productsRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';

import registerChatHandler from './listeners/chatHandler.js';
import __dirname from './utils.js';

import ProductManager from '../src/dao/fileSystem/Managers/ProductManagers.js';

const productManager = new ProductManager();
//configurar env
dotenv.config()

const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
const io = new Server(server);
const connection = mongoose.connect(process.env.URL_MONGO)
app.use(express.json())
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));
app.use((req,res,next) => {
  //Referenciando nuestro io
  req.io = io;
  next();
})

//Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');


app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/', viewsRouter);

//Escuchador de eventos (on)
io.on('connection', socket => {
  registerChatHandler(io, socket);
});

