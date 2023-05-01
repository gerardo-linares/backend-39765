const productSocket = io();

const productForm = document.querySelector('#form-product');

//Inputs
const inputName = document.querySelector('#name');
const inputDescription = document.querySelector('#description');
const inputCode = document.querySelector('#code');
const inputPrice = document.querySelector('#stock');
const inputStock = document.querySelector('#stock');
const inputCategory = document.querySelector('#category');
//Buttons
const btnAgregar = document.querySelector('#btnAgregar');
const btnEliminar = document.querySelector('#btnEliminar');
//Products
const productContainer = document.querySelector('#productContainer');


const dataForm = ()=>{
    let nombre = inputName.value;
    let descripcion = inputDescription.value;
    let codigo = inputCode.value;
    let precio = inputPrice.value;
    let stock = inputStock.value;
    let categoria = inputCategory.value;

    let product = {
        title: nombre,
        description: descripcion,
        code: codigo,
        status: true,
        price: Number(precio),
        stock: Number(stock),
        category: categoria
    };

    console.log('from dataform() product id', product);

    return product;
}

const validationData = ()=>{
    if(inputName.value && inputDescription.value && inputCode.value && inputPrice.value && inputStock.value && inputCategory.value){
        console.log('data complete');
        return true;
    }else{
        console.log('data incomplete');
        return false;
    };
};

productForm.addEventListener('submit', (event)=>{
    event.preventDefault();
});

btnAgregar.addEventListener('click', ()=>{
    if(validationData()){
        productSocket.emit('productReceived', dataForm())
        alert('product send');
    }
})


//Add product
productSocket.on('addProducts', (addProduct)=>{
    //console.log("add product", addProduct)
    let productList = '';
    addProduct.forEach((product) => {
        productList = `<div class="card m-5 " style="width: 18rem;">
                        <!-- <img src="..." class="card-img-top" alt="..."> -->
                            <div class="card-body" data-code="${product.code}">
                                <h5 class="card-title text-center">${product.title}</h5>
                                <p class="card-text">Descripcion: ${product.description}</p>
                                <p class="card-text">Categoria: ${product.category}</p>
                                <p class="card-text">Codigo Nº: ${product.code}</p>
                                <p class="card-text">Estado: ${product.status}</p>
                                <p class="card-text">Stock: ${product.stock}</p>
                                <p class="card-text">Precio: ${product.price}</p>
                            </div>
                        </div>`
    });
    productContainer.innerHTML += productList;
});


//Eliminar producto
btnEliminar.addEventListener('click', ()=>{
    const code = inputCode.value;
    if(code === ""){
        alert('Code incorrect');
        return;
    }

    const elementDelete = (code)=>{
        //debugger

        const productToDelete = document.querySelector(`[data-code="${code}"]`);
        productToDelete.parentNode.removeChild(productToDelete);
    }
    elementDelete(code)
    productSocket.emit('productDelete', code);
    alert(`Product with code ${code} eliminated`);
})