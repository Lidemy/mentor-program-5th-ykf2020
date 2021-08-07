/* eslint-disable */
const db = require('../models')
const { Op } = require("sequelize")
const Post = db.Post
const Category = db.Category

const postController = {
  getAllForIndex: (req, res) => {
    const page = (req.query.page > 1) ? req.query.page : 1
    const limit = 5
    const getTotal = Post.findAndCountAll()
    const getPosts = Post.findAll({
      offset: (page - 1) * limit,
      limit,
      order: [
        ['id', 'DESC']
      ],
      include: Category
    })
    Promise
      .all([getTotal, getPosts])
      .then(response => {
        res.render('index', {
          page,
          limit,
          total: response[0].count,
          posts: response[1]
        })
      })
      .catch(err => {
        req.flash('errorMessage', '連線錯誤，請稍後再試')
        res.render('err', {
          errorMessage: req.flash('errorMessage')
        })
      })

  },
  getAllForPosts: (req, res) => {
    Category.findAll().then(categories => {
      let where = {
        [Op.not]: null
      }
      if (req.query.category > 0 && req.query.category <= categories[categories.length - 1].id) {
        where = req.query.category
      }
      const page = (req.query.page > 1) ? req.query.page : 1
      const limit = 5
      const getTotal = Post.findAndCountAll({
        where: {
          CategoryId: where
        }
      })
      const getPosts = Post.findAll({
        where: {
          CategoryId: where
        },
        offset: (page - 1) * limit,
        limit,
        order: [
          ['id', 'DESC']
        ],
        include: Category
      })
      Promise
        .all([getTotal, getPosts])
        .then(response => {
          res.render('posts', {
            page,
            where,
            limit,
            categories,
            total: response[0].count,
            posts: response[1]
          })
        })
        .catch(error => {
          req.flash('errorMessage', '連線錯誤，請稍後再試')
          res.render('err', {
            errorMessage: req.flash('errorMessage')
          })
        })
    }).catch(err => {
      req.flash('errorMessage', '連線錯誤，請稍後再試')
      res.render('err', {
        errorMessage: req.flash('errorMessage')
      })
    })
  },
  get: (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      include: Category
    }).then(post => {
      res.render('post', {
        post
      })
    }).catch(err => {
      req.flash('errorMessage', '連線錯誤，請稍後再試')
      res.render('err', {
        errorMessage: req.flash('errorMessage')
      })
    })
  },
  addPost: (req, res) => {
    Category.findAll().then(categories => {
      res.render('addPost', {
        categories
      })
    }).catch(err => {
      req.flash('errorMessage', '連線錯誤，請稍後再試')
      res.render('err', {
        errorMessage: req.flash('errorMessage')
      })
    })
  },
  handleAddPost: (req, res) => {
    const { title, category, content } = req.body
    Post.create({
      title,
      CategoryId: category,
      content
    }).then(post => {
      res.redirect(`/post/${post.id}`)
    }).catch(err => {
      req.flash('errorMessage', '連線錯誤，請稍後再試')
      res.redirect('back')
    })
  },
  editPost: (req, res) => {
    const getPost = Post.findOne({
      where: {
        id: req.params.id
      },
      include: Category
    })
    const getCategories = Category.findAll()
    Promise
      .all([getPost, getCategories])
      .then(response => {
        res.render('editPost', {
          post: response[0],
          categories: response[1]
        })
      })
      .catch(err => {
        req.flash('errorMessage', '連線錯誤，請稍後再試')
        res.render('err', {
          errorMessage: req.flash('errorMessage')
        })
      })
  },
  handleEditPost: (req, res) => {
    Post.update({
      CategoryId: req.body.category,
      title: req.body.title,
      content: req.body.content
    }, {
      where: {
        id: req.body.id
      }
    }).then(post => {
      res.redirect(`/post/${req.body.id}`)
    }).catch(err => {
      req.flash('errorMessage', '連線錯誤，請稍後再試')
      res.redirect('back')
    })
  },
  deletePost: (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(result => {
      res.redirect('back')
    }).catch(err => {
      req.flash('errorMessage', '連線錯誤，請稍後再試')
      res.redirect('back')
    })
  },
  getAllForBackStage: (req, res) => {
    Post.findAll({
      order: [
        ['id', 'DESC']
      ],
      attributes: ['id', 'title', 'createdAt']
    }).then(posts => {
      res.render('backstage', {
        posts
      })
    }).catch(err => {
      req.flash('errorMessage', '連線錯誤，請稍後再試')
      res.render('err', {
        errorMessage: req.flash('errorMessage')
      })
    })
  }
}
module.exports = postController
