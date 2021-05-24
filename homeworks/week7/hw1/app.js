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
  // 若 radio的兩個選項皆為被選取，則將其 arr 中對應元素改為 false 並顯示必填訊息；若其中一個選項有被選取，則將其 arr 之對應元素改為true，並隱藏必填訊息
  if (!document.getElementById('bed').checked && !document.getElementById('ground').checked) {
    arr[4] = false
    enroll.classList.remove('hide')
  } else {
    arr[4] = true
    enroll.classList.add('hide')
  }

  // arr 陣列中含有任一元素為 false，則此函式回傳 false
  return !arr.includes(false)
}
