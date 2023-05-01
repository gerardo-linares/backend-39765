# backend-39765



DESAFÍO 1
Clases con ECMAScript y ECMAScript avanzado

Consigna:

Realizar una clase “ProductManager” que gestione un conjunto de productos.
Debe crearse desde su constructor con el elemento products, el cual será un arreglo vacío.

Cada producto que gestione debe contar con las propiedades:
title (nombre del producto)
description (descripción del producto)
price (precio)
thumbnail (ruta de imagen)
code (código identificador)
stock (número de piezas disponibles)

Debe contar con un método “addProduct” el cual agregará un producto al arreglo de productos inicial.
Validar que no se repita el campo “code” y que todos los campos sean obligatorios
Al agregarlo, debe crearse con un id autoincrementable
Debe contar con un método “getProducts” el cual debe devolver el arreglo con todos los productos creados hasta ese momento

Debe contar con un método “getProductById” el cual debe buscar en el arreglo el producto que coincida con el id
En caso de no coincidir ningún id, mostrar en consola un error “Not found”


DESAFÍO 2

Manejo de archivos

Consigna

Realizar una clase de nombre “ProductManager”, el cual permitirá trabajar con múltiples productos. Éste debe poder agregar, consultar, modificar y eliminar un producto y manejarlo en persistencia de archivos .
Aspectos a incluir

La clase debe contar con una variable this.path, el cual se inicializará desde el constructor y debe recibir la ruta a trabajar desde el momento de generar su instancia.

Debe guardar objetos con el siguiente formato:
id (se debe incrementar automáticamente, no enviarse desde el cuerpo)
title (nombre del producto)
description (descripción del producto)
price (precio)
thumbnail (ruta de imagen)
code (código identificador)
stock (número de piezas disponibles)

Debe tener un método addProduct el cual debe recibir un objeto con el formato previamente especificado, asignarle un id autoincrementable y guardarlo en el arreglo (recuerda siempre guardarlo como un array en el archivo).
Debe tener un método getProducts, el cual debe leer el archivo de productos y devolver todos los productos en formato de arreglo.
Debe tener un método getProductById, el cual debe recibir un id, y tras leer el archivo, debe buscar el producto con el id especificado y devolverlo en formato objeto

Debe tener un método updateProduct, el cual debe recibir el id del producto a actualizar, así también como el campo a actualizar (puede ser el objeto completo, como en una DB), y debe actualizar el producto que tenga ese id en el archivo.
Debe tener un método deleteProduct, el cual debe recibir un id y debe eliminar el producto que tenga ese id en el archivo.
Formato del entregable.


DESAFÍO 3 

En esta tarea se solicitó crear un servidor basado en Express que utiliza la clase ProductManager con persistencia de archivos para manejar los productos. Se agregaron dos endpoints:

La ruta /products que lee el archivo de productos y devuelve un objeto con todos los productos. Además, se agregó soporte para recibir por query param el valor ?limit= para limitar el número de resultados devueltos.
La ruta /products/:pid que recibe por req.params el pid (product Id) y devuelve sólo el producto solicitado en lugar de todos los productos.




DESAFÍO 4 

En estas consignas se solicita la configuración del servidor para integrar el motor de plantillas Handlebars y un servidor de socket.io. Se debe crear una vista "index.handlebars" que contenga una lista de todos los productos agregados hasta el momento y otra vista "realTimeProducts.handlebars" que trabajará con websockets y contendrá la misma lista de productos. Cada vez que se cree o elimine un producto, la lista se actualizará automáticamente en la vista de tiempo real. Se recomienda la creación de un formulario simple en la vista "realTimeProducts.handlebars" para enviar el contenido desde websockets y no HTTP.