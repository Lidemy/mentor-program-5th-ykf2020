const buttons = document.querySelectorAll('span')
const answers = document.querySelectorAll('.A')

// 因 buttons 的順序與 answers 的順序相同，故當特定的 button 被選取時，則取其 index 到 answers 陣列中顯示同樣 index 的元素
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', () => {
    answers[i].classList.toggle('noshow')
  })
}
