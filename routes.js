const routes = require("express").Router()
const passport = require("passport")
const User = require("./models/User")

//Middlewares
const auth = require("./middlewares/auth")
const notAuth = require("./middlewares/notAuth")

//Rotas para usuário não cadastrados
routes.get("/", notAuth, (req,res) => {
  res.render("index")
})

routes.post("/login",  passport.authenticate("local", {
  successRedirect: "/admin",
  failureRedirect: "/",
  failureFlash: true
}))

routes.get("/register", notAuth, (req,res) => {
  res.render("register")
})

routes.post("/create", async (req,res) => {
  try{
    const {name, email, password} = req.body
    const user = await User.create({name, email, password})
    res.redirect("/")
  }catch(err){
    res.send("Ocorreu um erro ao criar o usuário")
  }

})

///Rotas para usuário cadastrados
routes.get("/admin", auth, (req,res) => {
  res.render("auth/index")
})

module.exports = routes