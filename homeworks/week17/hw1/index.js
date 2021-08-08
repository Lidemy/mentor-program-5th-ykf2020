/* eslint-disable */
const express = require('express')
const bcrypt = require('bcrypt')
const app = express()
const path = require("path");
const flash = require('connect-flash')
const bodyParser = require('body-parser')
const session = require('express-session')
const Sequelize = require('sequelize')
const port = process.env.PORT || 5000
const postController = require('./controllers/post')
const userController = require('./controllers/user')
const categoryController = require('./controllers/category')

app.set('view engine', 'ejs')
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use(flash())
app.use((req, res, next) => {
  res.locals.isLogin = req.session.isLogin
  res.locals.errorMessage = req.flash('errorMessage')
  next()
})
app.use(express.static(__dirname + '/public'))

function checkPermission(req, res, next) {
  if (req.session.isLogin) {
    next()
  } else {
    res.redirect('back')
  }
}

app.get('/', postController.getAllForIndex)
app.get('/post/:id', postController.get)
app.get('/posts', postController.getAllForPosts)
app.get('/categories', categoryController.getAll)
app.get('/login', userController.login)
app.post('/login', userController.handleLogin)
app.get('/logout', userController.logout)
app.get('/addPost', checkPermission, postController.addPost)
app.post('/addPost', checkPermission, postController.handleAddPost)
app.get('/editPost/:id', checkPermission, postController.editPost)
app.post('/editPost', checkPermission, postController.handleEditPost)
app.get('/deletePost/:id', checkPermission, postController.deletePost)
app.post('/addCategory', checkPermission, categoryController.handleAddCategory)
app.post('/editCategory', checkPermission, categoryController.handleEditCategory)
app.get('/deleteCategory/:id', checkPermission, categoryController.handleDeleteCategory)
app.get('/backstage', checkPermission, postController.getAllForBackStage)
app.get('/about', (req, res) => {
  res.render('about')
})


app.listen(port, () => {
  console.log(`Example app listening on port: ${port}`)
})
