const passport = require('passport')
const localStrategy = require("passport-local").Strategy
const User = require("../models/User")
const bcrypt = require("bcryptjs")

module.exports = function(passport){
  const authenticateUser = async (email, password, done) => {
    try{
      let user = await User.find().where({email})

      if(!user){
        return done(null, false, {message : "Email não encontrado"})
      }
      
      user = user[0]
      const comparePassword = await bcrypt.compare(password, user.password)
      if(comparePassword){
        return done(null, user)
      }
      return done(null, false, {message : "Senha incorreta"})
    }catch(err){
      done(null, false, {message : "Uusário não encontrado"})
    }
  }

  passport.use(new localStrategy({
    usernameField: "email"
  },
    authenticateUser
  ))

  
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((user, done) => {
    return done(null, User.find().where("_id", user.id))
  })

}