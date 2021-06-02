const request = new XMLHttpRequest()

const navLis = document.querySelectorAll('li')
const siteName = document.querySelector('.navbar__site-name')
const landingSlogan = document.querySelector('.slogan__landing')
const streamingSlogan = document.querySelector('.slogan__streaming')
const streamsContainer = document.querySelector('.streams__container')
const mainContainer = document.querySelector('.main__container')
const more = document.querySelector('.more')
const gamesList = []
let currentGameIndex = 0
let offset = 0
let counting = 0

// 監聽整個視窗，一點進網頁就 call twitch API 抓前五名資料
window.addEventListener('load', () => {
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      console.log(request.status)
      let data
      try {
        data = JSON.parse(request.responseText)
      } catch (parseError) {
        console.log(parseError)
        return
      }
      // 取得前五名遊戲名單
      for (let i = 0; i < 5; i++) {
        gamesList.push({ name: data.top[i].game.name })
      }
      // 渲染前五名遊戲名單到 navbar
      renderGamesRank(gamesList)
      console.log(gamesList)
    } else {
      console.log(request.state, request.responseText)
    }
  }

  request.onerror = () => {
    console.log('error')
  }
  request.open('GET', 'https://api.twitch.tv/kraken/games/top')
  request.setRequestHeader('Client-ID', 'o68cz37u9fo4vin7xmuigdqwga8seh')
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
  request.send()
})

// 監聽首頁按鈕，點到則重新整理
siteName.addEventListener('click', () => {
  window.location.reload()
})

// 監聽前五名遊戲的選項，點到就以那個遊戲作為渲染依據
for (let i = 0; i < 5; i++) {
  navLis[i].addEventListener('click', () => {
    // 根據點選的選項改變 navbar 顏色
    cleanActive()
    navLis[i].classList.add('active')

    // 根據所點選的選項，選擇渲染的遊戲種類
    offset = 0
    counting = 0
    getStreams(gamesList, i)
    // 儲存目前觀看中的遊戲種類
    currentGameIndex = i
  })
}

// 監聽載入更多的選項，點到就載入更多
more.addEventListener('click', () => {
  offset = offset + 20
  getStreams(gamesList, currentGameIndex)
})

function cleanActive() {
  for (let i = 0; i < 5; i++) {
    navLis[i].classList.remove('active')
  }
}

function renderGamesRank(list) {
  for (let i = 0; i < 5; i++) {
    navLis[i].innerHTML = `<a href="#">${list[i].name}</a>`
  }
}

function getStreams(gamesList, i) {
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      console.log(request.status)
      let data
      try {
        data = JSON.parse(request.responseText)
      } catch (parseError) {
        console.log(parseError)
        return
      }
      // 將有選好遊戲名稱及 offset 調整後取得的實況名單傳入渲染用的函式中
      renderStreams(data)
    } else {
      if (offset !== 0) {
        offset = offset - 20
      }
      alert('系統不穩定，請再試一次')
    }
  }
  request.onerror = () => {
    if (offset !== 0) {
      offset = offset - 20
    }
    alert('系統不穩定，請再試一次')
    console.log('error')
  }
  request.open('GET', `https://api.twitch.tv/kraken/streams/?limit=20&offset=${offset}&game=${gamesList[i].name}`)
  request.setRequestHeader('Client-ID', 'o68cz37u9fo4vin7xmuigdqwga8seh')
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
  request.send()
}

function renderStreams(data) {
  // 把載入更多的顯示打開
  more.classList.remove('hide')
  // 檢查所有的實況找完了沒，如果找完了，把載入更多的按鈕隱藏
  if (data.streams.length === 0) {
    more.classList.add('hide')
    return
  }
  // 儲存目前已渲染的實況數目
  counting = counting + data.streams.length
  // 隱藏首頁 slogan
  landingSlogan.classList.add('hide')
  // 顯示選擇遊戲後的 slogan
  streamingSlogan.classList.remove('hide')
  streamingSlogan.innerHTML = `<h3>${data.streams[0].game}</h3>
  <p>Top ${counting} popular live streams sorted by current viewers</p>`
  // 移除所有 stream 以避免重複 render
  if (offset === 0) {
    streamsContainer.innerHTML = ''
  }
  // render 實況
  for (let i = 0; i < data.streams.length; i++) {
    // 創建底部資訊欄的 id、觀看人數部分
    const infoBottom = document.createElement('div')
    infoBottom.classList.add('stream__player__info__bottom')
    infoBottom.innerHTML = `<p>${data.streams[i].channel.display_name}</p>
    <p><i class="fa fa-users" aria-hidden="true"></i> ${data.streams[i].viewers}</p>`
    // 創建底部資訊欄的實況名稱部分
    const infoStatus = document.createElement('h3')
    infoStatus.innerText = data.streams[i].channel.status
    // 創建大頭貼
    const avatar = document.createElement('div')
    avatar.classList.add('stream__player__avatar')
    avatar.innerHTML = `<img src=${data.streams[i].channel.logo} alt="">`
    // 創建遊戲截圖
    const preview = document.createElement('div')
    preview.classList.add('stream__preview')
    preview.innerHTML = `<img src=${data.streams[i].preview.large} alt="">`
    // 創建實況點選連結
    const a = document.createElement('a')
    a.href = data.streams[i].channel.url
    // 創建每個實況畫面的樹狀結構
    const stream = document.createElement('div')
    stream.classList.add('stream')

    const streamPlayer = document.createElement('div')
    streamPlayer.classList.add('stream__player')

    const streamPlayerInfo = document.createElement('div')
    streamPlayerInfo.classList.add('stream__player__info')

    streamPlayerInfo.appendChild(infoStatus)
    streamPlayerInfo.appendChild(infoBottom)
    streamPlayer.appendChild(avatar)
    streamPlayer.appendChild(streamPlayerInfo)
    a.appendChild(preview)
    a.appendChild(streamPlayer)
    stream.appendChild(a)
    // 將創好的實況畫面放進 streamsContainer
    streamsContainer.appendChild(stream)
  }
  // 放新背景
  mainContainer.classList.add('newbg')
  mainContainer.classList.add('hidemask')
}
