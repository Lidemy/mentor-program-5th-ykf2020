/* eslint-disable */
const db = require('../models')
const User = db.User
const bcrypt = require('bcrypt')
const saltRounds = 8

const userController = {
  login: (req, res) => {
    res.render('login')
  },
  handleLogin: (req, res) => {
    User.findOne({
      where: {
        username: req.body.username
      }
    }).then(user => {
      if (!user) {
        req.flash('errorMessage', '帳號密碼錯誤')
        return res.redirect('/login')
      }
      bcrypt.compare(req.body.password, user.password, (error, result) => {
        if (error || !result) {
          req.flash('errorMessage', '帳號密碼錯誤')
          res.redirect('/login')
        } else {
        req.session.isLogin = true
        res.redirect('/')
        }
      })
    }).catch(err => {
      req.flash('errorMessage', '連線錯誤，請稍後再試')
      res.redirect('back')
    })
  },
  logout: (req, res) => {
    req.session.isLogin = null
    res.redirect('/')
  }
}

module.exports = userController
