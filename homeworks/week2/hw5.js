/* eslint-disable */
function join(arr, concatStr) {
  if (arr.length === 0) {
    return '' } else {
    var str = arr[0];
    for(var i=1; i<arr.length ;i++){
      str = str + concatStr + arr[i]
    }
    return str
  }
}
// 若為空陣列，回傳無內容的字串

function repeat(str, times) {

  var newstr = []
  for (var i=1; i<=times; i++){
    newstr = newstr + str
  }
  return newstr
}

console.log(join([1, 2, 3], ''))
console.log(repeat('a', 5));

//留下兩個 condole.log 作為代表性的答案，刪除其他的
