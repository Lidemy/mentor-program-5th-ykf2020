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
  const n = Number(lines[0])
  for (let i = 1; i <= n; i++) {
    const k = Number(lines[i])
    let flag = 'Prime'
    if (k === 1) {
      flag = 'Composite'
    } else {
      for (let j = 2; j < k; j++) {
        if (k % j === 0) {
          flag = 'Composite'
        }
      }
    }
    console.log(flag)
  }
}
