/* eslint-disable */
import { addComment , getComments } from './api.js'
import { escape, appendCommentToDOM, prependCommentToDOM} from './utils.js'
import { cssTemplate, getTemplate, appendStyle} from './template.js'
import $ from 'jquery'

export function init(options) {

  let site
  let limit
  let offset = 0
  let added = 0
  let containerElement
  let commentsDOM
  let commentsSelector
  let moreDOM
  let moreSelector
  let submitDOM
  let submitSelector
  let nickname
  let comment
  let content
  let apiUrl = ''

  site = options.site
  limit = options.limit
  apiUrl = options.apiUrl
  containerElement = $(options.containerSelector)
  containerElement.append(getTemplate(site))
  commentsDOM = `${site}-card-container`
  commentsSelector = '.' + commentsDOM
  moreDOM = `${site}-btn-more`
  moreSelector = '.' + moreDOM
  submitDOM = `${site}-btn-submit`
  submitSelector = '.' + submitDOM
  appendStyle(cssTemplate)


  // 載入首頁顯示的留言
  getComments(apiUrl, site, limit, offset, (data) => {
    let contents = data.comments
    for(content of contents) {
      appendCommentToDOM($(commentsSelector), content)
    }

    // 如果 more 回傳 false，代表接下來沒有資料了，把載入更多按鈕隱藏起來
    if(!data.more){
      $(moreSelector).addClass('hide')
      return
    } else {
      $(moreSelector).removeClass('hide')
    }
  })

  // 新增留言：點擊送出鈕後對 API 新增一個留言，然後在留言列表 prepend 一個留言
  containerElement.on('click',submitSelector,(e) => {
    e.preventDefault()
    let nickname = $(`.${site}-input`).val()
    let comment = $(`.${site}-textarea`).val()
    addComment(apiUrl,site,nickname,comment,(data) => {
      let content = {
        id: data.id,
        nickname,
        comment
      }
      prependCommentToDOM($(commentsSelector),content)

      // 清除輸入框
      $(`.${site}-input`).val('')
      $(`.${site}-textarea`).val('')
      added = added + 1
    })
  })

  // 載入更多：按下載入更多按鈕後，顯示再下面五個留言
  containerElement.on('click',moreSelector,(e) => {
    e.preventDefault()
    offset = offset + limit + added
    getComments(apiUrl, site, limit, offset, (data) => {
      let contents = data.comments;
      for(content of contents) {
        appendCommentToDOM($(commentsSelector),content)
      }
      // 如果 more 回傳 false，代表接下來沒有資料了，把載入更多按鈕隱藏起來
      if(!data.more){
        $(moreSelector).addClass('hide')
        return
      }
      added = 0
    })
  })
}
