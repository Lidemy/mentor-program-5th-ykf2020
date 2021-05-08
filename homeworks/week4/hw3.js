const request = require('request')

const url = 'https://restcountries.eu/rest/v2/name/'
const name = process.argv[2]

request(url + name, (err, res, body) => {
  const datas = JSON.parse(body)
  if (datas.status === 404) {
    console.log('找不到國家資訊')
    return
  }
  for (let i = 0; i < datas.length; i++) {
    const { name } = datas[i]
    const { capital } = datas[i]
    const currency = datas[i].currencies[0].code
    const callingCode = datas[i].callingCodes[0]
    console.log('============')
    console.log(`國家： ${name}`)
    console.log(`首都： ${capital}`)
    console.log(`貨幣： ${currency}`)
    console.log(`國碼： ${callingCode}`)
  }
})
