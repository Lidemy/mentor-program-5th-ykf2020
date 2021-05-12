// 引入 request 及 urlencode
const request = require('request')
const urlencode = require('urlencode')

// 用 urlencode 解析傳入的遊戲名稱
const gameName = urlencode(process.argv[2])

// 設定offset初始值
let offset = 0
// 設定空陣列以存實況資料
const streams = []

// get request 設定
const options = {
  url: `https://api.twitch.tv/kraken/streams/?limit=100&offset=${offset}&game=${gameName}`,
  headers: {
    'Client-ID': 'o68cz37u9fo4vin7xmuigdqwga8seh',
    Accept: 'application/vnd.twitchtv.v5+json'
  }
}
request(options, (err, res, body) => {
  // 第一次 get request 的回傳資料存為 datas
  const datas = JSON.parse(body).streams

  // 跑一百次把第一次抓的一百筆實況資料存到 streams 陣列
  for (let j = 0; j < datas.length; j++) {
    streams.push({
      name: datas[j].channel.display_name,
      id: datas[j].channel.name,
      viewers: datas[j].viewers
    })
  }

  // 調整 offset 使其從第 101 個開始抓下一百筆的資料
  offset = 100
  options.url = `https://api.twitch.tv/kraken/streams/?limit=100&offset=${offset}&game=${gameName}`

  request(options, (err, res, body) => {
    // 第二次 get request 的回傳資料存為 datas2
    const datas2 = JSON.parse(body).streams

    // 跑一百次把第二次抓的一百筆實況資料存到 streams 陣列
    for (let i = 0; i < datas2.length; i++) {
      streams.push({
        name: datas2[i].channel.display_name,
        id: datas2[i].channel.name,
        viewers: datas2[i].viewers
      })
    }

    //  把實況主列表從頭到尾 log 一遍
    for (let k = 0; k < streams.length; k++) {
      console.log('====================')
      console.log(`排名： ${k + 1} / 實況名稱： ${streams[k].name} / 實況主ID： ${streams[k].id} / 觀看人數： ${streams[k].viewers}`)
    }
  })
})
