/* eslint-disable */
import $ from 'jquery'
export function addComment(apiUrl,site,nickname,comment,cb) {
  $.ajax({
    type : 'post',
    url : `${apiUrl}/api_add_comment.php`,
    data : {
      site,
      nickname,
      comment
    }
  })
  .done(function(data){
    if(!data.loading_result){
      alert("留言失敗，請再試一次")
      return
    }
    cb(data)
  })
  .fail(function(data){
    alert("連線失敗，請重新整理")
  })
}
export function getComments(apiUrl, site, limit, offset = 0, cb) {
  $.ajax({
    type: 'post',
    url: `${apiUrl}/api_comments.php`,
    data: {
      site,
      limit,
      offset
    }
  })
  .done(function(data){
    if(!data.loading_result){
      alert("載入失敗，請再試一次")
      return
    }
    cb(data)
  })
  .fail(function(data){
    alert("連線失敗，請重新整理")
  })
}
