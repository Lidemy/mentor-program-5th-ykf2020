/* eslint-disable */
function join(arr, concatStr) {

  var str = arr[0];
  for(var i=1; i<arr.length ;i++){
    str = str + concatStr + arr[i]
  }
  return str
}

function repeat(str, times) {

  var newstr = []
  for (var i=1; i<=times; i++){
    newstr = newstr + str
  }
  return newstr
}

console.log(repeat('a', 5));

console.log(join(['a'], '!'));
console.log(repeat('a', 5));
