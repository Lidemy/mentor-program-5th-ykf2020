function reverse(str) {

  var strsplit = str.split("")

  var strreverse = [];

  for (var i = strsplit.length - 1 ; i >= 0 ; i-- ) {
    strreverse.push(strsplit[i])
  }
  console.log(strreverse.join(''))
}
reverse('hello');
