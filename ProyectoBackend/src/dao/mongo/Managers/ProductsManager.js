import productsModel from "../models/products.js";

export default class ProductsManager {
  getProducts = (params) => {
    return productsModel.find(params);
  };

  getProductById = (productId) => {
    return productsModel.findById(productId);
  };

  addProduct = (product) => {
    return productsModel.create(product);
  };

  updateProduct = (productId, productToUpdate) => {
    return productsModel.updateOne(
      { _id: productId },
      { $set: productToUpdate }
    );
  };

  deleteProduct = (productId) => {
    return productsModel.deleteOne({ _id: productId });
  };

  getProductByCode = (code) => {
    return productsModel.findOne({ code });
  };

  getPaginatedProducts = async (filters, options) => {
    try {
      const result = await productsModel.paginate(filters, options);
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener los productos paginados");
    }
  };
}
