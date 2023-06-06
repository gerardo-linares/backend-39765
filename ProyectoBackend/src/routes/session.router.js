import { Router } from "express";
import SessionManager from "../dao/mongo/Managers/SessionManager.js";
import { createHAsh, validatePassword } from "../utils.js";

const router = Router();
const sessionManager = new SessionManager();

router.post('/register', async (req, res) => {
    try {
      const { firstName,lastName,email,password} = req.body;
      //el usuario existe?
      const exists = await sessionManager.findUser(email)
      if(exists) return res.status(400).send({status:"error",error:"User already exists"})
      //sino existe, ahora encripta
      const hashedPassword = await createHAsh(password)
      // crea el usuario a registrar
      const user ={
        firstName,
        lastName,
        email,
        password:hashedPassword
      }
      const result = await sessionManager.registerUser(user);
        res.send({ status: "success", payload: result });
    } catch (error) {
        res.status(500).send({ status: "error", error: error.message });
    }
});



router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      req.session.user = {
        name: "Admin",
        role: "admin",
        email: "notengo",
      };
      return res.status(200).send({ message: "modo admin activado" });
    }
// existe el usuario?
    const user = await sessionManager.loginUser(email);
    if (!user) {
      return res
        .status(400)
        .send({ status: "error", error: "Credenciales incorrectas" });
    }
//si existe , verifica el password encriptado
    const isValidPassword = await validatePassword(password, user.password);

    if (!validatePassword)
      return res
        .status(400)
        .send({ status: "error", error: "contraseña incorrecta" });

//si el usuario existe y su contrañea es correcta, crea sesion.
    const cartId = user.cartId; // Obtener el ID del carrito del usuario desde la base de datos
    req.session.user = {
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      cartId: cartId, // Asignar el ID del carrito al objeto de sesión del usuario
      role: user.role,
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
