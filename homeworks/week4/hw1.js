const request = require('request')

const url = 'https://lidemy-book-store.herokuapp.com/books'

request(`${url}?_limit=10`, (err, res, body) => {
  const books = JSON.parse(body)
  for (let i = 0; i < books.length; i++) {
    console.log(`${books[i].id} ${books[i].name}`)
  }
})
