const passport = require("passport")

module.exports = (req,res,next) => {
  if(req.isAuthenticated()){
    return res.redirect("/admin")
  }
  next()
}