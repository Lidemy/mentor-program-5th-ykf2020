/* eslint-disable */
$(document).ready(() => {
  /* 與API相關操作 */
  // 拿網址中的 query
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const id = urlParams.get('id')
  const apiUrl = './api_todos.php'
  const saveApiUrl = './api_save_todos.php'

  // 如果有拿到 id 的話，就 call API 拿資料
  if (id) {
    $.ajax({
      type: 'post',
      url: apiUrl,
      data: {
        id
      }
    })
      .done((d) => {
        if (!d.result) {
          alert('載入失敗，請再試一次')
          return
        }

        // 如果給的 id 是資料庫裡沒資料的，強制跳轉回沒帶 query 的頁面
        if (!d.data) {
          window.location.href = 'todos.html'
        }

        // 拿到資料後 render
        const todosInfo = JSON.parse(d.data.content)
        for (todoInfo of todosInfo) {
          renderTodo(todoInfo.title, todoInfo.status)
        }
        // 計數、顯示清空按鈕
        countUncompleted()
        toggleClearBtn()
      })
      .fail(() => {
        alert('連線失敗，請重新整理')
      })
  }

  // 按下儲存按鈕之後，call API存檔
  $('.save-btn').click(() => {
    const savetodos = []
    $('.todo').each(function() {
      savetodos.push({
        title: $(this).find('li').text(),
        status: ($(this).hasClass('completed') ? 1 : 0)
      })
    })
    // 如果一開始的頁面是有帶query的 儲存完成不會回傳 id
    if (id) {
      $.ajax({
        type: 'post',
        url: saveApiUrl,
        data: {
          id,
          content: JSON.stringify(savetodos)
        }
      })
        .done((d) => {
          if (!d.result) {
            alert('載入失敗，請再試一次')
            return
          }
          alert('儲存成功')
          return
        })
        .fail(() => {
          alert('連線失敗，請重新整理')
        })
    } else {
      // 如果一開始的頁面是沒帶query的，儲存完成後告知 id，並跳轉到該 id 頁
      $.ajax({
        type: 'post',
        url: saveApiUrl,
        data: {
          content: JSON.stringify(savetodos)
        }
      })
        .done((d) => {
          if (!d.result) {
            alert('載入失敗，請再試一次')
            return
          }
          alert('這次的todos存在 ID = ' + d.id + '的地方！')
          window.history.pushState('', '', '?id=' + d.id)
        })
        .fail(() => {
          alert('連線失敗，請重新整理')
        })
    }
  })

  function renderTodo(title, status) {
    $('.todos').append(`<div class="todo ${status == 1 ? 'completed' : ''}" style="display: flex;">
      <li onmouseover="this.title" title="${escape(title)}">${escape(title)}</li>
      <button class="complete_btn"><i class="fas fa-check" aria-hidden="true"></i></button>
      <button class="delete_btn"><i class="fas fa-trash" aria-hidden="true"></i></button>
    </div>`)
  }

  /* todolist基本操作 */

  // 按下新增按鈕時做 addTodo
  $('.todo-button').click(addTodo)

  // 編輯按鈕、刪除按鈕的作動
  $('.todos').click(todoAction)

  // select 選單的作動
  $('.filter').change(filterAction)

  // 清空已完成按鈕的做動
  $('.clear-btn').click(clearCompleted)

  // 雙擊 todo 可編輯
  $('.todos').on('dblclick', '.todo', () => {
    // 避免一直雙擊就一直新增編輯框，給一個條件限制只能有一個 form
    if ($(this).find('form').length === 0) {
      // append 一個新的 form 疊在本來的 todo 上作為編輯用
      $(this).append(`<form class="edit-form" action="index.html" method="post">
      <input class="edit" type="text" value="" />
      <input class="hide" type="submit" name="" value="">
    </form>`)
    }
    // 把 input 框 focus 起來再把 value 放進去，跟把 value 直接放在 template 裡比起來，
    // 這樣滑鼠游標會位在字串最後面，比較好看
    $(this).find('.edit').focus()
    $(this).find('.edit').val($(this).find('li').text())
  })

  // 編輯狀態下按 enter 送出會儲存編輯，並關掉編輯框
  $('.todos').on('submit', 'form', (e) => {
    e.preventDefault()
    const val = $(e.target).find('.edit').val()
    $(e.target).siblings('li').text(val)
    $(e.target).remove()
  })

  // 編輯狀態下按編輯框之外的地方，會儲存編輯，並關掉編輯框
  $(document).mouseup((e) => { // 如果點到的地方不是編輯框也不是編輯框底下的元素時，會儲存編輯，並關掉編輯框
    if (!$('.edit-form').is(e.target) && $('.edit-form').has(e.target).length === 0) {
      const val = $('.edit-form').find('.edit').val()
      $('.edit-form').siblings('li').text(val)
      $('.edit-form').remove()
    }
  })

  // 設定新增 todo 用的 addTodo 函式
  function addTodo(e) {
    // 阻止表單送出
    e.preventDefault()

    // 取得 input 中的值
    const value = $('.todo-input').val()

    // 如果空 input 直接 return
    if (!value) return

    // 加 todo 到 todos 這個 ul 中
    $('.todos').append(`<div class="todo" style="display: flex;">
      <li onmouseover="this.title" title="${escape(value)}">${escape(value)}</li>
      <button class="complete_btn"><i class="fas fa-check" aria-hidden="true"></i></button>
      <button class="delete_btn"><i class="fas fa-trash" aria-hidden="true"></i></button>
    </div>`)

    // 將 input 還原回空值
    $('.todo-input').val('')

    // 過濾、計數、顯示清空按鈕
    filterAction()
    countUncompleted()
    toggleClearBtn()
  }

  // 設定更改為已完成或刪除 todo 用的 todoAction 函式
  function todoAction(e) {
    if ($(e.target).hasClass('complete_btn')) {
      // 將被按到的 todo 做 completed 這個效果的 class 的 toggle
      $(e.target).parent().toggleClass('completed')
      // 過濾分類、計數、顯示清空按鈕
      filterAction()
      countUncompleted()
      toggleClearBtn()
    }
    if ($(e.target).hasClass('delete_btn')) {
      // 將被按到的 todo 做 gone 這個動畫效果 class 的 新增
      $(e.target).parent().addClass('gone')
      // gone 的動畫跑完後刪除此 todo
      $(e.target).parent().bind('webkitTransitionEnd', () => {
        $(e.target).parent().remove()
        // 過濾分類、計數、顯示清空按鈕
        filterAction()
        countUncompleted()
        toggleClearBtn()
      })
    }
  }

  // 設定過濾 todo 類型用的 filterAction 函式
  function filterAction() {
    // 設定 all_todos 為所有 todos 形成的 Nodelist
    $('.todo').each(function() {
      if ($(this).hasClass('completed')) {
        $('.filter').val() === 'uncompleted' ? $(this).css('display', 'none') : $(this).css('display', 'flex')
      } else {
        $('.filter').val() === 'completed' ? $(this).css('display', 'none') : $(this).css('display', 'flex')
      }
      // 顯示清空按鈕
      toggleClearBtn()
    })
  }

  // 決定是否顯示清空按鈕
  function toggleClearBtn() {
    let flag = 0
    $('.todo').each(function() {
      if ($(this).hasClass('completed')) {
        flag = 1
      }
    })
    if (flag === 1) {
      $('.clear-btn').removeClass('hide')
    } else {
      $('.clear-btn').addClass('hide')
    }
  }

  // 計數未完成的 todo 數量
  function countUncompleted() {
    let count = 0
    $('.uncompleted-amount').removeClass('hide')
    $('.todo').each(function() {
      if (!$(this).hasClass('completed')) {
        count++
      }
      $('.counting').text(count)
    })
    if ($('.todos').children().length === 0) {
      $('.uncompleted-amount').addClass('hide')
    }
  }

  // 清空已完成 todo
  function clearCompleted() {
    $('.todo').each(function() {
      if ($(this).hasClass('completed')) {
        $(this).remove()
      }
    })
    // 顯示清空按鈕
    toggleClearBtn()
  }

  // 定義 escape function
  function escape(toOutput){
      return toOutput.replace(/\&/g, '&amp;')
          .replace(/\</g, '&lt;')
          .replace(/\>/g, '&gt;')
          .replace(/\"/g, '&quot;')
          .replace(/\'/g, '&#x27')
          .replace(/\//g, '&#x2F');
  }
})
