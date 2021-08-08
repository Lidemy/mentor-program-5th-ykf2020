/* eslint-disable */
const express = require('express')
const bcrypt = require('bcrypt')
const app = express()
const fetch = require("node-fetch")
const flash = require('connect-flash')
const bodyParser = require('body-parser')
const session = require('express-session')
const Sequelize = require('sequelize')
const multer = require('multer')
const port = process.env.PORT || 5000
const uploadController = require('./controllers/upload')
const prizeController = require('./controllers/prize')
const upload = multer({
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Allowed only .png or .jpeg or .jpg'))
    }
    cb(null, true)
  }
})
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))
app.use(flash())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.locals.isLogin = req.session.isLogin
  res.locals.errorMessage = req.flash('errorMessage')
  next()
})

function checkPermission(req, res, next) {
  if (req.session.isLogin) {
    next()
  } else {
    res.redirect('/login')
  }
}

app.set('view engine', 'ejs')
app.get('/', prizeController.index)
app.post('/draw', prizeController.draw)
app.get('/backstage', checkPermission, prizeController.getAll)
app.post('/upload', checkPermission, upload.single('pic'), prizeController.checkPossibility, uploadController.handleUpload, prizeController.addPrize)
app.get('/login', (req, res) => {
  res.render('login')
})
app.get('/editPrize/:id', checkPermission, prizeController.edit)
app.post('/editPrize/:id', checkPermission, upload.single('pic'), prizeController.checkEditPossibility, uploadController.handleUpload, prizeController.handleEdit)
app.get('/deletePrize/:id', checkPermission, prizeController.delete)
app.post('/login', (req, res) => {
  if (req.body.username != 'admin') {
    req.flash('errorMessage', '帳密錯誤')
    return res.redirect('/login')
  }
  bcrypt.compare(req.body.password, process.env.PW, (error, result) => {
    if (error || !result) {
      req.flash('errorMessage', '帳密錯誤')
      return res.redirect('/login')
    }
    req.session.isLogin = true
    res.redirect('/backstage')
  })
})
app.get('/logout', (req, res) => {
  req.session.isLogin = null
  res.redirect('/')
})
app.listen(port, () => {
  console.log(`Example app listening on port: ${port}`)
})
