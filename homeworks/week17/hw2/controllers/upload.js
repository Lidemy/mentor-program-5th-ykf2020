/* eslint-disable */
const fetch = require("node-fetch")
const FormData = require('form-data')
const clientid = '73524a74856081a'
const token = 'd63d7fa0acbf0f43cdf2afc784ce4054dd1109fd'
const album = '7Wbpqxp'
const uploadController = {
  handleUpload: (req, res, next) => {
    const image = ''
    if (req.file) {
      const encoded_image = req.file.buffer.toString('base64')
      const data = new FormData()
      data.append('image', encoded_image)
      data.append('album', album)
      fetch('https://api.imgur.com/3/image', {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + token,
          },
          body: data
        }).then(response => {
          return response.json()
        }).then(data => {
          res.locals.image = data.data.link
          next()
        })
        .catch(err => {
          req.flash('errorMessage', '上傳圖片錯誤，請檢查連線或 Imgur 服務接口')
          res.redirect('/backstage')
        })
    } else {
      next()
    }
  }
}
module.exports = uploadController
