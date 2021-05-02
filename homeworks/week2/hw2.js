/* eslint-disable */
function capitalize(str){
  if (str.length === 0 ) {
    return "" } else {
  var strsplit = str.split('')

  if(strsplit[0]>="a" && strsplit[0] <= "z" ){
    strsplit[0] = strsplit[0].toUpperCase()
  }
  return(strsplit.join(""))
  }
}

console.log(capitalize(''));
