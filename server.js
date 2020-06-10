const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const flash = require("express-flash")
const session = require("express-session")
const mongoStore = require('connect-mongo')(session)
const mongoose = require("./config/database")
const passport = require("passport")
const passportConfig = require("./config/passport")(passport)


const routes = require("./routes")
const port = 3131

app.set("view engine", "ejs")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(flash())
app.use(session({
  store: new mongoStore({
    host: '192.168.0.7',
    port: '27017',
    mongooseConnection: mongoose.connection,
    db: "session",
    url: "mongodb://localhost:27017/passport2",
    ttl: 30 * 60
  }),
  secret: '12345678',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(routes)

app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})