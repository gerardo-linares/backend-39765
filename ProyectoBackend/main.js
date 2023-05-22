import ProductManager from "./managers/ProductManagers.js";

const productManager = new ProductManager();

const context = async () => {
  const test = await productManager.getProducts();

  let figura1 = {
    title: 'Wolverine',
    description: 'test product',
    price: 5000,
    thumbnails: [],
    code: 'abc2',
    stock: 15,
    status: true
  }
  let figura2 = {
    title: 'Spiderman',
    description: 'test product',
    price: 5000,
    thumbnails: [],
    code: 'abc3',
    stock: 5,
    status: true
  }
  let Lampara1 = {
    title: 'Lampara articulada',
    description: 'test product',
    price: 10000,
    thumbnails: [],
    code: 'abc4',
    stock: 8,
    status: true
  }
  let lampara2 = {
    title: 'Lampara de monos',
    description: 'test product',
    price: 10000,
    thumbnails: [],
    code: 'abc5',
    stock: 7,
    status: true
  }
  let cuadro1 = {
    title: 'Cuadro de montañas',
    description: 'test product',
    price: 2500,
    thumbnails: [],
    code: 'abc6',
    stock: 9,
    status: true
  }
  let cuadro2 = {
    title: 'Cuadro de tiburones',
    description: 'test product',
    price: 2500,
    thumbnails: [],
    code: 'abc7',
    stock: 25,
    status: true
  }



  /* Comentar/descomentar para testear */

  //1) Para agregar nuevos productos, escriba la variable del producto a agregar en el parametro de addProduct.
  /* await productManager.addProduct(mouse); */

  //2) Mostrando los productos agregados actualmente:
  /* console.log(await productManager.getProducts()); */

  //3) Para encontrar un producto especifico:
  /* console.log(await productManager.getProductById(2)); */
  
  //4) Para actualizar un producto. No se puede actualizar si se trata de actualizar a una id o un code existente.
  /* const updatedProduct = await productManager.updateProduct(2, {
    id: 3,
    title: 'Lampara articulada',
    description: 'Nuevo test',
    code: "abc4"
  });
  console.log(updatedProduct); */


//5) Para eliminar un producto. Para que se elimine, ambas id´s deben ser las mismas.
  /* try {
    const deleteProduct = await productManager.getProductById(3);
    await productManager.deleteProduct(3);
    console.log(`Producto: "${deleteProduct.title}" se ha eliminado exitosamente`);
  } catch (error) {
    console.error(error.message);
  } */
}

context();