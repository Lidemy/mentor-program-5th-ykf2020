
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
  const arr = lines[0].split(' ')
  const n = Number(arr[0])
  const m = Number(arr[1])

  for (let i = n; i <= m; i++) {
    const digit = i.toString()
    let sum = 0
    for (let k = 0; k < digit.length; k++) {
      sum = sum + (Math.pow(Number(digit[k]), i.toString().length))
    }
    if (sum === i) {
      console.log(sum)
    }
  }
}
