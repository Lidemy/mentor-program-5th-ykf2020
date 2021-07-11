/* eslint-disable */
const gamesList = []
let currentGameIndex = 0
let offset = 0
let counting = 0

// 監聽整個視窗，一點進網頁就 call twitch API 抓前五名資料
$(document).ready(
  async function topFive() {
    const response = await fetch('https://api.twitch.tv/kraken/games/top',{
      method: 'get',
      headers: {
        'Client-ID': 'o68cz37u9fo4vin7xmuigdqwga8seh',
        'Accept': 'application/vnd.twitchtv.v5+json'
      }
    })
    const jsonData = await response.json()
    try {
      for (let i = 0; i < 5; i++) {
        gamesList.push({ name: jsonData.top[i].game.name })
        // 渲染名稱到 navbar
        $('#'+i).html(`<a href="#">${gamesList[i].name}</a>`)
      }
    } catch(err) {
      alert('系統不穩定，請再試一次')
    }
})


$('.navbar__list').on('click','li', function(){
  $('li').removeClass('active')
  $(this).addClass('active')

  // 根據所點選的選項，選擇渲染的遊戲種類
  let i = ($(this).attr('id'))

  offset = 0
  counting = 0
  getStreams(gamesList, i)
  // 儲存目前觀看中的遊戲種類
  currentGameIndex = i
})


// 監聽載入更多的選項，點到就載入更多
$('.more').click(() => {
  offset = offset + 20
  getStreams(gamesList, currentGameIndex)
})

// 監聽首頁按鈕，點到則重新整理
$('.navbar__site-name').click(() => {
  window.location.reload()
})

async function getStreams(gamesList, i) {
  const response = await fetch(`https://api.twitch.tv/kraken/streams?limit=20&offset=${offset}&game=${gamesList[i].name}`,{
    method: 'get',
    headers: {
      'Client-ID': 'o68cz37u9fo4vin7xmuigdqwga8seh',
      'Accept': 'application/vnd.twitchtv.v5+json'
    }
  })
  try {
    const jsonData = await response.json()
    renderStreams(jsonData)
  } catch (err) {
    if (offset !== 0) {
      offset = offset - 20
    }
    alert('系統不穩定，請再試一次')
  }
}

function renderStreams(data) {
  const { streams } = data
  // 把載入更多的顯示打開
  $('.more').removeClass('hide')
  // 檢查所有的實況找完了沒，如果找完了，把載入更多的按鈕隱藏
  if (streams.length === 0) {
    $('.more').addClass('hide')
    return
  }
  // 儲存目前已渲染的實況數目
  counting = counting + streams.length
  // 隱藏首頁 slogan
  $('.slogan__landing').addClass('hide')
  // 顯示選擇遊戲後的 slogan
  $('.slogan__streaming').removeClass('hide')
  $('.slogan__streaming').html(`<h3>${streams[0].game}</h3>
  <p>Top ${counting} popular live streams sorted by current viewers</p>`)
  // 移除所有 stream 以避免重複 render
  if (offset === 0) {
    $('.streams__container').html("")
  }
  // 移除所有 empty 卡片
  $('.streams__container').find(".stream-empty").remove()
  // render 實況
  for (let i = 0; i < streams.length; i++) {
    const card = document.createElement('div')
    card.classList.add('stream')
    card.innerHTML =
    `<a href="${streams[i].channel.url}">
        <div class="stream__preview">
          <img src="${streams[i].preview.large}" alt="">
        </div>
        <div class="stream__player">
            <div class="stream__player__avatar">
              <img src="${streams[i].channel.logo}" alt="">
            </div>
            <div class="stream__player__info">
              <h3>${streams[i].channel.status}</h3>
              <div class="stream__player__info__bottom">
                <p>${streams[i].channel.display_name}</p>
                <p><i class="fa fa-users" aria-hidden="true"></i> ${streams[i].viewers}</p>
              </div>
            </div>
        </div>
      </a>`
    $('.streams__container').append(card)
  }

  // 放兩個 empty 卡片
  for(i = 0; i < 2; i++) {
    const streamEmpty = document.createElement('div')
    streamEmpty.classList.add('stream-empty')
    $('.streams__container').append(streamEmpty)
  }

  // 放新背景
  $('.main__container').addClass('newbg')
  $('.main__container').addClass('hidemask')
}
