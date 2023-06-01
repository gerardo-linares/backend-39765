const form = document.getElementById('registerForm');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(form);

    const obj = {};
    data.forEach((value, key) => (obj[key] = value));


    
    try {
        const response = await fetch('/api/session/register', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const responseData = await response.json();

        if (responseData.status === "success") {
            // Redireccionar al usuario a la página de inicio de sesión
            window.location.replace('/login');
        } else {
            // Manejar el caso de error o respuesta inesperada
            console.log(responseData);
        }
    } catch (error) {
        // Manejar errores de conexión o solicitudes
        console.error('Error:', error);
    }
});
