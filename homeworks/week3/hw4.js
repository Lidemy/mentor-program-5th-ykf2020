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
  const str = lines[0]
  let reverse = ''
  for (let i = str.length - 1; i >= 0; i--) {
    reverse = reverse + str[i]
  }
  console.log(reverse === str ? 'True' : 'False')
}
