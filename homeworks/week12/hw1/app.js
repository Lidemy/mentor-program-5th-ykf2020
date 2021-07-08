/* eslint-disable */
$(document).ready(function(){

  var site = 1
  var limit = 5
  var offset = 0
  var added = 0
  var apiUrl = './api_comments.php'
  var addApiUrl =  './api_add_comment.php'

  // 定義 escape function
  function escape(toOutput){
      return toOutput.replace(/\&/g, '&amp;')
          .replace(/\</g, '&lt;')
          .replace(/\>/g, '&gt;')
          .replace(/\"/g, '&quot;')
          .replace(/\'/g, '&#x27')
          .replace(/\//g, '&#x2F');
  }
  // 定義 append 留言的 function
  function appendCommentToDOM(container,content){
    container.append(`<div class="card">
      <div class="card-body">
        <h5 class="card-title">[${escape(content.id.toString())}] ${escape(content.nickname)}</h5>
        <p class="card-text">${escape(content.comment)}</p>
      </div>
    </div>`)
  }
  // 定義 prepend 留言的 function
  function prependCommentToDOM(container,content){
    container.prepend(`<div class="card">
      <div class="card-body">
        <h5 class="card-title">[${escape(content.id.toString())}] ${escape(content.nickname)}</h5>
        <p class="card-text">${escape(content.comment)}</p>
      </div>
    </div>`)
  }


  // 頁面讀取好後先對後端要一次所有留言的資料，limit = 5
  $.ajax({
    type : 'post',
    url : apiUrl,
    data : {
      site,
      limit
    }
  })
  .done(function(data) {
    if(!data.loading_result) {
      alert(data.description)
      return
    }

    const comments = data.comments;
    for(comment of comments) {
      appendCommentToDOM($('.card-container'),comment)
    }

    // 如果 more 回傳 false，代表接下來沒有資料了，把載入更多按鈕隱藏起來
    if(!data.more){
      $('.more-btn').addClass('hide')
      return
    } else {
      $('.more-btn').removeClass('hide')
    }
  })
  .fail(function(data){
    alert("連線失敗，請重新整理")
  })

  // 點擊送出鈕後對 API 新增一個留言，然後在留言列表 prepend 一個留言
  $('.send_comment').submit(function(e){
    e.preventDefault()
    $.ajax({
      type : 'post',
      url : addApiUrl,
      data : {
        site,
        nickname : $('input[id=nickname]').val(),
        comment : $('textarea[id=comment]').val(),
      }
    })
    .done(function(data){
      if(!data.loading_result){
        alert("留言失敗，請再試一次")
        return
      }
      const comment = {
        id: data.id,
        nickname: $('input[id=nickname]').val(),
        comment: $('textarea[id=comment]').val()
      }
      prependCommentToDOM($('.card-container'),comment)

      // 清除輸入框
      $('input[id=nickname]').val('')
      $('textarea[id=comment]').val('')
      added = added + 1
    })
    .fail(function(data){
      alert("連線失敗，請重新整理")
    })
  })

  // 按下載入更多按鈕後，顯示再下面五個留言（透過 more 參數已經按的次數調整以改變 offset）
  $('.more-btn').click(function(e){
    offset = offset + limit + added
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: apiUrl,
      data: {
        site,
        offset
      }
    })
    .done(function(data){
      if(!data.loading_result){
        alert("載入失敗，請再試一次")
        return
      }

      const comments = data.comments;
      for(comment of comments) {
        appendCommentToDOM($('.card-container'),comment)
      }

      // 如果 more 回傳 false，代表接下來沒有資料了，把載入更多按鈕隱藏起來
      if(!data.more){
        $('.more-btn').addClass('hide')
        return
      }
      added = 0
    })
  })
})
