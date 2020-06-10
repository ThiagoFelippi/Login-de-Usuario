const passport = require("passport")

module.exports = (req,res,next) => {
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect("/")
}