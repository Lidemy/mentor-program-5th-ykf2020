const request = new XMLHttpRequest()

const banner = document.querySelector('.banner')
const games = document.querySelector('.games')
const gamesButton = document.querySelector('.games__button')

// 按下抽獎按鈕會發生的動作
gamesButton.addEventListener('click', () => {
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      let data
      try {
        data = JSON.parse(request.responseText)
      } catch (parseError) {
        console.log(parseError)
        alert('「系統資料解析錯誤，請再試一次」')
        return
      }
      // 若 parse 過的資料無誤，則傳入抽獎 function
      changeScene(data.prize)
    } else {
      alert('「系統不穩定，請再試一次」')
    }
  }
  request.onerror = () => {
    alert('「系統不穩定，請再試一次」')
  }
  request.open('GET', 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery')
  request.send()
})

// 抽獎的function
function changeScene(data) {
  switch (data) {
    case 'FIRST': {
      // 將抽獎資訊的 div 關掉
      games.style.display = 'none'
      // 將背景換成頭獎的背景
      banner.style.background = 'url("./first.jpg") center/cover no-repeat'
      // 動態生成頭獎內容
      const prize = document.createElement('div')
      prize.classList.add('prize')

      const prizeAnnouncement = document.createElement('h2')
      prizeAnnouncement.innerText = '恭喜你中頭獎了！日本東京來回雙人遊！'

      const prizeButton = document.createElement('div')
      prizeButton.classList.add('prize__button')
      prizeButton.innerText = '點此輸入領獎資訊'

      prize.appendChild(prizeAnnouncement)
      prize.appendChild(prizeButton)

      banner.appendChild(prize)
      banner.classList.add('mask')
      break
    }
    case 'SECOND': {
      games.style.display = 'none'

      banner.style.background = 'url("./second.jpg") center/cover no-repeat'

      const prize = document.createElement('div')
      prize.classList.add('prize')

      const prizeAnnouncement = document.createElement('h2')
      prizeAnnouncement.innerText = '二獎！90 吋電視一台！'

      const prizeButton = document.createElement('div')
      prizeButton.classList.add('prize__button')
      prizeButton.innerText = '點此輸入領獎資訊'

      prize.appendChild(prizeAnnouncement)
      prize.appendChild(prizeButton)

      banner.appendChild(prize)
      banner.classList.add('mask')
      break
    }
    case 'THIRD': {
      games.style.display = 'none'

      banner.style.background = 'url("./third.jpg") center/cover no-repeat'

      const prize = document.createElement('div')
      prize.classList.add('prize')

      const prizeAnnouncement = document.createElement('h2')
      prizeAnnouncement.innerText = '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！'

      const prizeButton = document.createElement('div')
      prizeButton.classList.add('prize__button')
      prizeButton.innerText = '點此輸入領獎資訊'

      prize.appendChild(prizeAnnouncement)
      prize.appendChild(prizeButton)

      banner.appendChild(prize)
      banner.classList.add('mask')
      break
    }
    case 'NONE': {
      games.style.display = 'none'

      banner.style.background = 'black'

      const prize = document.createElement('div')
      prize.classList.add('prize')

      const prizeAnnouncement = document.createElement('h2')
      prizeAnnouncement.classList.add('none')
      prizeAnnouncement.innerText = '銘謝惠顧'

      const sorryImg = new Image(300)
      sorryImg.src = 'https://media.giphy.com/media/3ohs7Ys9J8XyFVheg0/giphy.gif'

      prize.appendChild(prizeAnnouncement)
      prize.appendChild(sorryImg)
      banner.appendChild(prize)

      break
    }
  }
}
