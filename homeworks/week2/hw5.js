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

console.log(join([1, 2, 3], ''))
console.log(join(["a", "b", "c"], "!"))
console.log(join(["a", 1, "b", 2, "c", 3], ','))
console.log(repeat('a', 5));
console.log(repeat('yoyo', 2))
