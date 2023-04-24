#backend-proyectoFinal

Este es un proyecto backend que utiliza el puerto 8080. Está organizado en las siguientes carpetas:

db: Contiene los archivos fileSystem, carts.json y products.json.

controllers: Contiene las funciones asincrónicas que controlan los requerimientos del usuario.

routes: Contiene las rutas de los productos y carritos.

src: Incluye las clases cartManager y productManager.

El archivo principal index.js contiene las siguientes importaciones:

Express: Un framework para Node.js que permite crear servidores web.

Los metodos son los siguientes: 

***Gestor de Productos***

getAllProducts
Este método devuelve todos los productos disponibles en el sistema. Puede limitar el número de productos devueltos si se pasa un parámetro de límite como parámetro de consulta.

getProdById
Este método devuelve el producto con el ID especificado.

addProduct
Este método agrega un nuevo producto al sistema. Requiere privilegios de administrador para ejecutarse. Genera un nuevo ID para el producto y lo agrega a la base de datos.

updateProductById
Este método actualiza un producto existente con el ID especificado. Actualiza la información del producto con los datos pasados en el cuerpo de la solicitud.

deleteProdById
Este método elimina el producto con el ID especificado del sistema.



***Gestor de Carritos***

createCart
Este método crea un nuevo carrito en el sistema.

getCartId
Este método devuelve el carrito con el ID especificado.

getProductsByIdCart
Este método agrega un producto al carrito con el ID especificado. Requiere el ID del producto y el ID del carrito como parámetros. Si el producto ya está en el carrito, aumenta la cantidad en uno. De lo contrario, agrega el producto con una cantidad de uno.