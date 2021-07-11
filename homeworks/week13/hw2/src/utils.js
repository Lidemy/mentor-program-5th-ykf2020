/* eslint-disable */
import $ from 'jquery'
export function escape(toOutput){
    return toOutput.replace(/\&/g, '&amp;')
        .replace(/\</g, '&lt;')
        .replace(/\>/g, '&gt;')
        .replace(/\"/g, '&quot;')
        .replace(/\'/g, '&#x27')
        .replace(/\//g, '&#x2F');
}
export function appendCommentToDOM(container,content){
  container.append(`<div class="card">
    <div class="card-body">
      <h5 class="card-title">[${escape(content.id.toString())}] ${escape(content.nickname)}</h5>
      <p class="card-text">${escape(content.comment)}</p>
    </div>
  </div>`)
}
export function prependCommentToDOM(container,content){
  container.prepend(`<div class="card">
    <div class="card-body">
      <h5 class="card-title">[${escape(content.id.toString())}] ${escape(content.nickname)}</h5>
      <p class="card-text">${escape(content.comment)}</p>
    </div>
  </div>`)
}
