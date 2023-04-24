
//Imports
import express from 'express';
const app = express();

//Port
const port = 8080;

//Imports Routes
import  {productsRouter} from'./routes/productsRouter.js';
import  {cartsRouter} from'./routes/cartsRouter.js';

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

//Listen server
app.listen (port, ()=> console.log(`Listening on port: ${port}`));
