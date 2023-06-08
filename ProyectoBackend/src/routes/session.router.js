import { Router } from "express";

import passport from "passport";

const router = Router();


router.post('/register',passport.authenticate('register',{failureRedirect:'/api/session/registerfail',failureMessage:true }), async (req, res) => {
    res.send({ status: "success", messages:"Registered" });

});

router.get('/registerfail',(req,res) =>{
  console.log(req.session.messages)
  res.status(400).send({status:"error",error:req.session.messages})
})

router.post("/login",passport.authenticate('login',{ failureRedirect:'/api/session/loginfail',failureMessage:true }), async (req, res) => {
    req.session.user={
        name: req.user.name,
        role: req.user.role,
        email: req.user.email,
        id: req.user.id
}

res.send({ status: "success", messages: "Logged in" });
});

router.get('/loginfail',(req,res) =>{
  console.log(req.session.messages);
  res.status(400).send({status:"error",error:req.session.messages})

})

router.post('/logout', async (req, res) => {
    try {
        // Destruir la sesión
        req.session.destroy((err) => {
            if (err) {
                throw new Error(err.messages);
            } else {
                res.redirect('/products'); // Redirigir a la página de productos después de cerrar sesión
            }
        });
    } catch (error) {
        res.status(500).send({ status: "error", error: error.messages });
    }
});


router.get("/github", passport.authenticate("github"), (req, res) => {});
router.get("/githubcallback", passport.authenticate("github"), (req, res) => {
  const user = req.user;
  //aqui creo la session.
  req.session.user = {
    id: user.id,
    name: user.firstName,
    email: user.email,
    role: user.role,
  };
  res.redirect("/products");
});

export default router;
