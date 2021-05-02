const readline = require('readline')

const lines = []
const rl = readline.createInterface({
  input: process.stdin
})

rl.on('line', (line) => {
  lines.push(line)
})

rl.on('close', () => {
  solve(lines)
})

function solve(lines) {
  const arr = lines[0].split('')
  const reverse = []
  for (let i = arr.length - 1; i >= 0; i--) {
    reverse.push(arr[i])
  }
  let flag = 'True'
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== reverse[i]) {
      flag = 'False'
    }
  }
  console.log(flag)
}
