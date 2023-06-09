import passport from "passport";
import local from "passport-local";
import GithubStrategy from "passport-github2";
import userModel from "../dao/mongo/models/user.js";
import { createHash, validatePassword } from "../utils.js";

const localStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new localStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, email, password, done) => {
        try {
          const { firstName, lastName } = req.body;
          //1 el usuario existe?
          const exists = await userModel.findOne({ email: email });
          //done devuelve un usuario en req.user//
          if (exists)
            return done(null, false, { message: "El usuario ya existe" });

          //2 sino existe, ahora encripta
          const hashedPassword = await createHash(password);
          // crea el usuario a registrar
          const user = {
            firstName,
            lastName,
            email,
            password: hashedPassword,
          };
          const result = await userModel.create(user);
          //si salio todo bien, done finaliza bien
          done(null, result);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new localStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        //passport solo devuelve el user final, no es responsable de la session//
        if (
          email === process.env.ADMIN_EMAIL &&
          password === process.env.ADMIN_PASSWORD
        ) {
          const user = {
            id: 0,
            name: "Admin",
            role: "admin",
            email: "notengo",
          };
          return done(null, user);
        }
        let user;
        // existe el usuario?
        user = await userModel.findOne({ email });
        if (!user) {
          return done(null, false, { message: "Credenciales incorrectas" });
        }
        //si existe , verifica el password encriptado
        const isValidPassword = await validatePassword(password, user.password);

        if (!isValidPassword)
          return done(null, false, { message: "contraseña incorrecta" });

        //si el usuario existe y su contrañea es correcta, crea sesion.
        const cartId = user.cartId; // Obtener el ID del carrito del usuario desde la base de datos
        user = {
          id: user._id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          cartId: cartId, // Asignar el ID del carrito al objeto de sesión del usuario
          role: user.role,
        };

        return done(null, user);
      }
    )
  );

  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // console.log(profile)
          //tomo los datos//
          const { name, email } = profile._json;
          const user = await userModel.findOne({ email });
          if (!user) {
            //sino existe, lo crea
            const newUser = {
              firstName: name,
              email,
              password: "",
            };
            const result = await userModel.create(newUser);
            done(null, result);
            //si el usuario existia, se actualiza
          }
          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.serializeUser(function (user, done) {
    return done(null, user.id);
  });

  passport.deserializeUser(async function (id, done) {
    const user = await userModel.findOne({ _id: id });
    return done(null, user);
  });
};

export default initializePassport;
