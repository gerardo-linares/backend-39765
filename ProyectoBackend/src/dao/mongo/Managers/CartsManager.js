import cartsModel from "../models/carts.js"

export default class CartsManager {
  getCarts = (params) => {
    return cartsModel.find(params).lean();
  };

  getCartById = (cartId) => {
    return cartsModel.findById(cartId);
  };

  addCart = (carts) => {
    return cartsModel.create(carts);
  };

  addProductToCart = async (cartId, productId, quantity) => {
    const cart = await this.getCartById(cartId);

    if (!cart) {
      throw new Error('Carrito no encontrado. Por favor, ingrese una Id válida.');
    }
    //Buscando el producto con el ID proporcionado
    const product = cart.products.find(p => p.product === productId);
    if (product) {
      product.quantity += 1;
    } else {
      console.log();
      cart.products.push({
        product: productId,
        quantity: 1
      });
    }

    // Guardando los cambios en la base de datos
    cart.save();

    // Retornando el carrito actualizado
    return cart;
  }
}