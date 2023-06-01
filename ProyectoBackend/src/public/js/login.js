const form = document.getElementById('loginForm');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(form);

    const obj = {};
    data.forEach((value, key) => (obj[key] = value));


    
    try {
        const response = await fetch('/api/session/login', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const responseData = await response.json();

        if (responseData.status === "success") {
            // Redireccionar al usuario a la página de productos
            window.location.replace('/products');
            return; // Salir de la función para evitar la ejecución adicional
        }

        // Manejar el caso de error o respuesta inesperada
        console.log(responseData);
    } catch (error) {
        // Manejar errores de conexión o solicitudes
        console.error('Error:', error);
    }
});
