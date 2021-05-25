/* eslint-disable camelcase, prefer-template, space-infix-ops, no-trailing-spaces */

// 新增一個 validate 函式給 from 的 onsubmit 設定作為是否送出表單的參考依據
// eslint-disable-next-line no-unused-vars
function validate() {
// arr 陣列用以確認每一必填部分都有被填寫了
  const arr = [false, false, false, false, false]

  const nickname = document.querySelector('input[name=nickname]')
  const email = document.querySelector('input[name=email]')
  const phone = document.querySelector('input[name=phone]')
  const knowing = document.querySelector('input[name=knowing]')
  const enroll = document.querySelector('.enroll')
  const advice = document.querySelector('input[name=advice]')
  let enroll_answer = ''

  // 若 nickname 的 input 有值，則將其 arr 之對應元素改為true，並隱藏必填訊息；若無值則改為 false 並顯示必填訊息
  if (!nickname.value) {
    arr[0] = false
    nickname.parentNode.classList.remove('hide')
  } else {
    arr[0] = true
    nickname.parentNode.classList.add('hide')
  }
  // 若 email 的 input 有值，則將其 arr 之對應元素改為true，並隱藏必填訊息；若無值則改為 false 並顯示必填訊息
  if (!email.value) {
    arr[1] = false
    email.parentNode.classList.remove('hide')
  } else {
    arr[1] = true
    email.parentNode.classList.add('hide')
  }
  // 若 phone 的 input 有值，則將其 arr 之對應元素改為true，並隱藏必填訊息；若無值則改為 false 並顯示必填訊息
  if (!phone.value) {
    arr[2] = false
    phone.parentNode.classList.remove('hide')
  } else {
    arr[2] = true
    phone.parentNode.classList.add('hide')
  }
  // 若 knowing 的 input 有值，則將其 arr 之對應元素改為true，並隱藏必填訊息；若無值則改為 false 並顯示必填訊息
  if (!knowing.value) {
    arr[3] = false
    knowing.parentNode.classList.remove('hide')
  } else {
    arr[3] = true
    knowing.parentNode.classList.add('hide')
  }
  // 若 radio 其中一個選項有被選取，則將其 arr 之對應元素改為true，並隱藏必填訊息，以及將 enrool_answer令為其選項敘述
  // 若沒選取，則將其 arr 之對應元素改為false，並顯示必填訊息
  if (document.getElementById('bed').checked) {
    arr[4] = true
    enroll.classList.add('hide')
    enroll_answer = document.querySelector('.bed_content').innerText
  } else if (document.getElementById('ground').checked) {
    arr[4] = true
    enroll.classList.add('hide')
    enroll_answer = document.querySelector('.ground_content').innerText
  } else {
    arr[4] = false
    enroll.classList.remove('hide')
  }
  // arr 陣列中含有任一元素為 false，則此函式回傳 false。若全為 true，則 alert 資料並return true 給 form 的 onsubmit
  // 並 alert 其訊息
  if (!arr.includes(false)) {
    // 若 其他 未填，則其內容令為'無'
    if (!advice.value) {
      advice.value = '無'
    }
    alert(
      '感謝填寫，你填寫的資料如下，\n' +
      '暱稱：' + nickname.value+'\n' +
      '電子郵件：' + email.value+'\n' +
      '手機號碼：' + phone.value+'\n' +
      '報名類型：' + enroll_answer + '\n' +
      '怎麼知道這個活動的：' + knowing.value + '\n' +
      '其他：' + advice.value)
    return true
  } else {
    return false
  }
}
