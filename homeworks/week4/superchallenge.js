const https = require('https')

const url = 'https://lidemy-book-store.herokuapp.com/books'
const func = process.argv[2]

if (func === 'list') {
  https.get(`${url}?_limit=20`, (res) => {
    res.on('data', (d) => {
      const books = JSON.parse(d)
      for (let i = 0; i < books.length; i++) {
        console.log(`${books[i].id} ${books[i].name}`)
      }
    })
  })
}

if (func === 'read') {
  const id = Number(process.argv[3])
  https.get(`${url}/${id}`, (res) => {
    res.on('data', (d) => {
      const book = JSON.parse(d)
      console.log(book.id, book.name)
    })
  })
}

if (func === 'create') {
  const newItem = process.argv[3]
  const newdata = JSON.stringify({
    name: newItem
  })
  const options = {
    hostname: 'lidemy-book-store.herokuapp.com',
    path: '/books',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': newdata.length
    }
  }

  const req = https.request(options, (res) => {
    res.on('data', (d) => {
      process.stdout.write(d)
    })
  })

  req.write(newdata)
  req.end()
}

if (func === 'delete') {
  const id = process.argv[3]
  const options = {
    hostname: 'lidemy-book-store.herokuapp.com/',
    path: `/books/+${id}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const req = https.request(options, (res) => {
    console.log('statusCode:', res.statusCode)
    res.on('data', (d) => {})
  })

  req.end()
  req.on('error', (e) => {
    console.error(e)
  })
}

if (func === 'update') {
  const id = process.argv[3]
  const updatedItem = process.argv[4]
  const updatedData = JSON.stringify({
    name: updatedItem
  })

  const options = {
    hostname: 'lidemy-book-store.herokuapp.com',
    path: `/books/+${id}`,
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const req = https.request(options, (res) => {
    res.on('data', (d) => {
      process.stdout.write(d)
    })
  })

  req.write(updatedData)
  req.end()
}
