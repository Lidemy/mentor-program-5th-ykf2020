const request = require('request')

const url = 'https://lidemy-book-store.herokuapp.com/books'

switch (process.argv[2]) {
  case 'list':
    request(`${url}?_limit=20`, (err, res, body) => {
      const books = JSON.parse(body)
      for (let i = 0; i < books.length; i++) {
        console.log(`${books[i].id} ${books[i].name}`)
      }
    })
    break
  case 'read': {
    const id = Number(process.argv[3])
    request(`${url}/${id}`, (err, res, body) => {
      const book = JSON.parse(body)
      console.log(`${book.id} ${book.name}`)
    })
    break
  }
  case 'create': {
    const newItem = process.argv[3]
    request.post(url).form({ name: newItem })
    break
  }
  case 'update': {
    const updateId = Number(process.argv[3])
    const updateItem = process.argv[4]
    request.patch(`${url}/${updateId}`).form({ name: updateItem })
    break
  }
  case 'delete': {
    const deleteid = Number(process.argv[3])
    request.delete(`${url}/${deleteid}`)
    break
  }
  default:
    console.log('yoyoyo')
}
