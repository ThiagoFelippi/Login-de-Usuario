const mongoose = require("../config/database")
const bcrypt = require('bcryptjs')

const User = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

User.pre("save", async function(next){
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash
  next()
})

module.exports = mongoose.model("users", User)