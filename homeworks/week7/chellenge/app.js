/* eslint-disable camelcase, prefer-template */
// 選取左右按鈕
const left = document.querySelector('.fa-chevron-left')
const right = document.querySelector('.fa-chevron-right')
// 選取第一張幻燈片，以它來當推擠的基準
const first_push = document.querySelector('.first_push')
// 選取下方點點按鈕
const slide_buttons = document.querySelectorAll('.slide-button')

// 設定幻燈片的總數
const slides_amount = slide_buttons.length
// 設定幻燈片的 index
let slide_index = 0
let margin = 0

// 按到右邊按鈕時需做的調整
right.addEventListener('click', () => {
  // 點點按鈕的填色全部先消掉
  slide_buttons.forEach((slide_button) => {
    slide_button.classList.remove('fill')
  })
  // 調整幻燈片的 index，向右按則加 1，但超過幻燈片總數則歸零以跳回第一張
  slide_index++
  if (slide_index > slides_amount - 1) {
    slide_index = 0
  }
  // 以目前幻燈片 index 來為點點按鈕填色
  slide_buttons[slide_index].classList.add('fill')

  // 以目前幻燈片 index 來決定推擠的程度，因為有四張幻燈片，則第二張開始每張推擠 25% 的 margin
  margin = slide_index * (100 / slides_amount)
  first_push.style['margin-left'] = '-' + margin + '%'
})

// 按到右邊按鈕時需做的調整
left.addEventListener('click', () => {
  // 點點按鈕的填色全部先消掉
  slide_buttons.forEach((slide_button) => {
    slide_button.classList.remove('fill')
  })

  // 調整幻燈片的 index，向左按則減 1，但低於 0 則改為幻燈片總數以跳回最後一張
  slide_index--
  if (slide_index < 0) {
    slide_index = slides_amount - 1
  }

  // 以目前幻燈片 index 來為點點按鈕填色
  slide_buttons[slide_index].classList.add('fill')

  // 以目前幻燈片 index 來決定推擠的程度，因為有四張幻燈片，則第二章開始每張推擠 25% 的 margin
  margin = slide_index * (100 / slides_amount)
  first_push.style['margin-left'] = '-' + margin + '%'
})

// 按到點點按鈕時需做的調整
for (let i = 0; i < slides_amount; i++) {
  slide_buttons[i].addEventListener('click', () => {
    // 點點按鈕的填色全部先消掉
    slide_buttons.forEach((slide_button) => {
      slide_button.classList.remove('fill')
    })

    // 幻燈片的 index 即為目前 點點按鈕 在陣列中的 index
    slide_index = i

    // 以目前幻燈片 index 來為點點按鈕填色
    slide_buttons[slide_index].classList.add('fill')

    // 以目前幻燈片 index 來決定推擠的程度，因為有四張幻燈片，則第二章開始每張推擠 25% 的 margin
    margin = slide_index * (100 / slides_amount)
    first_push.style['margin-left'] = '-' + margin + '%'
  })
}
