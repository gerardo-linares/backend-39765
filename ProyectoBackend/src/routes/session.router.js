import { Router } from "express";

import passport from "passport";

const router = Router();


router.post('/register',passport.authenticate('register',{failureRedirect:'/api/sessions/registerfail'}), async (req, res) => {
    res.send({ status: "success",message:"Registered" });

});

router.get('/registerfail',(req,res) =>{
  console.log(req.session.message)
  res.status(400).send({status:"error",error:req.session.message})
})

router.post("/login",passport.authenticate('login',{ failureRedirect:'/api/session/loginfail' }), async (req, res) => {
  req.session.user={
    name: req.user.name,
    role: req.user.role,
    email: req.user.email,
    id: req.user.id
}
res.send({ status: "success", message: "Logged in" });
});

router.get('/loginfail',(req,res) =>{
  console.log(req.session.message);
  res.status(400).send({status:"error",error:req.session.message})

})

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
