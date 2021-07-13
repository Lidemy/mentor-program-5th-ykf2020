/* eslint-disable */
export const cssTemplate = `.card {margin:12px 0 12px;}.card-title {font-size: 18px;}.hide {display:none}`

export function appendStyle(css) {
  const styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  styleElement.appendChild(document.createTextNode(css))
  document.head.appendChild(styleElement)
}

export function getTemplate(site) {
  return `<form class="send_comment" action="api_add_comments.php" method="post">
    <div class="mb-3">
      <label for="nickname" class="form-label">暱稱</label>
      <input type="text" class="form-control ${site}-input" id="nickname">
    </div>
    <div class="mb-3">
      <label for="comment" class="form-label">留言</label>
      <textarea type="text" class="form-control ${site}-textarea" id="comment"></textarea>
    </div>
    <button type="submit" class="btn btn-primary ${site}-btn-submit">送出</button>
  </form>
  <div class="${site}-card-container"></div>
  <a type="button" class="hide btn btn-primary ${site}-btn-more" href="">載入更多</a>
  </div>`
}
