/* eslint-disable */
const db = require('../models')
const Post = db.Post
const Category = db.Category

const categoryController = {
  getAll: (req, res) => {
    Category.findAll({
      order: [
        ['id', 'ASC']
      ],
      include: {
        model: Post,
        attributes: ['id', 'title']
      }
    }).then(categories => {
      res.render('categories', {
        categories
      })
    }).catch(err => {
      req.flash('errorMessage', '連線錯誤，請稍後再試')
      res.render('err', {
        errorMessage: req.flash('errorMessage')
      })
    })
  },
  handleAddCategory: (req, res) => {
    Category.create({
      name: req.body.categoryname
    }).then(newCat => {
      res.redirect('/categories')
    }).catch(err => {
      req.flash('errorMessage', '連線錯誤，請稍後再試')
      res.redirect('back')
    })
  },
  handleEditCategory: (req, res) => {
    Category.update({
      name: req.body.categoryname
    }, {
      where: {
        id: req.body.id
      }
    }).then(updated => {
      res.redirect('/categories')
    }).catch(err => {
      req.flash('errorMessage', '連線錯誤，請稍後再試')
      res.redirect('back')
    })
  },
  handleDeleteCategory: (req, res) => {
    const deletePosts = Post.destroy({
      where: {
        CategoryId: req.params.id
      }
    })
    const deleteCategory = Category.destroy({
      where: {
        id: req.params.id
      }
    })
    Promise
      .all([deletePosts, deleteCategory])
      .then(response => {
        res.redirect('/categories')
      })
      .catch(err => {
        req.flash('errorMessage', '連線錯誤，請稍後再試')
        res.redirect('back')
      })
  }
}

module.exports = categoryController
