import { Router } from "express";
import SessionManager from "../dao/mongo/Managers/SessionManager.js";

const router = Router();
const sessionManager = new SessionManager();

router.post('/register', async (req, res) => {
    try {
        const result = await sessionManager.registerUser(req.body);
        res.send({ status: "success", payload: result });
    } catch (error) {
        res.status(500).send({ status: "error", error: error.message });
    }
});




router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if(email==="adminCoder@coder.com"&& password==="123"){
      req.session.user = {
        name: 'Admin',
        role: "admin",
        email: "notengo",
      };
      return res.status(200).send({ message:"modo admin activado"})

    }
    const user = await sessionManager.loginUser(email, password);

    if (!user) {
      return res.status(400).send({ status: "error", error: "Usuario o contraseña incorrecta" });
    }

    const cartId = user.cartId; // Obtener el ID del carrito del usuario desde la base de datos
    req.session.user = {
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      cartId: cartId, // Asignar el ID del carrito al objeto de sesión del usuario
      role: user.role
    };

    res.send({ status: "success", message: "Inicio de sesión exitoso" });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
});





router.post('/logout', async (req, res) => {
    try {
        // Destruir la sesión
        req.session.destroy((err) => {
            if (err) {
                throw new Error(err.message);
            } else {
                res.redirect('/products'); // Redirigir a la página de productos después de cerrar sesión
            }
        });
    } catch (error) {
        res.status(500).send({ status: "error", error: error.message });
    }
});



export default router;
