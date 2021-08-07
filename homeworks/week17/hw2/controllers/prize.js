/* eslint-disable */
const db = require('../models')
const Prize = db.Prize
const prizeController = {
  index: (req, res) => {
    res.locals.currentItems = []
    Prize.findAll().then(prizes => {
      for (p of prizes) {
        const { id, prize, description, possibility, image } = p
        res.locals.currentItems.push({
          id,
          possibility,
          prize,
          description,
          image
        })
      }
      res.render('index')
    }).catch(err => {
      req.flash('errorMessage', '連線錯誤，請稍後再試')
      res.render('index', {
        errorMessage: req.flash('errorMessage')
      })
    })
  },
  addPrize: (req, res) => {
    Prize.create({
      prize: req.body.prize,
      description: req.body.description,
      possibility: req.body.possibility,
      image: res.locals.image
    }).then(prize => {
      res.redirect('/backstage')
    }).catch(err => {
      req.flash('errorMessage', '連線錯誤，請檢查連線或資料庫')
      res.redirect('/backstage')
    })
  },
  getAll: (req, res) => {
    Prize.findAll().then(prizes => {
      res.render('backstage', {
        prizes
      })
    }).catch(err => {
      req.flash('errorMessage', '連線錯誤，請檢查連線或資料庫')
      res.render('error', {
        errorMessage: req.flash('errorMessage')
      })
    })
  },
  checkPossibility: (req, res, next) => {
    Prize.findAll().then(prizes => {
      let total = parseFloat(req.body.possibility)
      for (p of prizes) {
        total = total + parseFloat(p.possibility)
      }
      if (total > 100) {
        req.flash('errorMessage', '總中獎率超出 100%，請重設')
        return res.redirect('/backstage')
      } else {
        next()
      }
    }).catch(err => {
      req.flash('errorMessage', '連線錯誤，請檢查連線或資料庫')
      res.redirect('/backstage')
    })
  },
  checkEditPossibility: (req, res, next) => {
    Prize.findAll().then(prizes => {
      let total = parseFloat(req.body.possibility)
      let target = 0
      for (p of prizes) {
        if (p.id == req.params.id) {
          target = parseFloat(p.possibility)
          total = total - target
        }
        total = total + parseFloat(p.possibility)
      }
      if (total > 100) {
        req.flash('errorMessage', '總中獎率超出 100%，請重設')
        return res.redirect('/backstage')
      } else {
        next()
      }
    }).catch(err => {
      req.flash('errorMessage', '連線錯誤，請檢查連線或資料庫')
      res.redirect('/backstage')
    })
  },
  edit: (req, res) => {
    Prize.findOne({
      where: {
        id: req.params.id
      }
    }).then(prize => {
      res.render('edit', {
        prize
      })
    }).catch(err => {
      req.flash('errorMessage', '連線錯誤，請檢查連線或資料庫')
      res.redirect('/backstage')
    })
  },
  handleEdit: (req, res) => {
    Prize.update({
      prize: req.body.prize,
      description: req.body.description,
      possibility: req.body.possibility,
      image: res.locals.image
    }, {
      where: {
        id: req.params.id
      }
    }).then(prize => {
      res.redirect('/backstage')
    }).catch(err => {
      req.flash('errorMessage', '連線錯誤，請檢查連線或資料庫')
      res.redirect('/backstage')
    })
  },
  delete: (req, res) => {
    Prize.destroy({
      where: {
        id: req.params.id
      }
    }).then(result => {
      res.redirect('/backstage')
    }).catch(err => {
      req.flash('errorMessage', '連線錯誤，請檢查連線或資料庫')
      res.redirect('/backstage')
    })
  },
  draw: (req, res) => {
    Prize.findAll().then(prizes => {
      let drawingList = []
      for (p of prizes) {
        const { id, prize, description, possibility, image } = p
        drawingList.push({
          id,
          possibility,
          prize,
          description,
          image
        })
      }

      function draw(list) {
        let p = [0]
        let win = Math.floor(Math.random() * 1000 + 1)
        let result = false

        list.sort((a, b) => {
          if (parseFloat(a.possibility) * 10 < parseFloat(b.possibility) * 10) {
            return -1
          }
          if (parseFloat(a.possibility) * 10 > parseFloat(b.possibility) * 10) {
            return 1
          }
          return 0
        })

        for (let i = 0; i < list.length; i++) {
          p.push(p[i] + parseFloat(list[i].possibility) * 10)
        }
        for (let j = 1; j < p.length; j++) {
          if (p[j - 1] < win && win <= p[j]) {
            return result = {
              prize: list[j - 1].prize,
              description: list[j - 1].description,
              image: list[j - 1].image || "https://ichef.bbci.co.uk/news/640/cpsprodpb/3A91/production/_107939941_child-with--present.jpg"
            }
          }
        }
        return result
      }
      let result = draw(drawingList)
      res.send({
        result
      })
    }).catch(err => {
      let result = {
        prize: '連線錯誤，請稍後再試',
        description: '連線錯誤，請稍後再試',
        image: "https://ichef.bbci.co.uk/news/640/cpsprodpb/3A91/production/_107939941_child-with--present.jpg"
      }
      res.send({
        result
      })
    })
  }
}
module.exports = prizeController
