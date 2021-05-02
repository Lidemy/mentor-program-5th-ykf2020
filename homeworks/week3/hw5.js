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
  const round = Number(lines[0])
  for (let i = 1; i <= round; i++) {
    const arr = lines[i].split(' ')
    const a = BigInt(arr[0])
    const b = BigInt(arr[1])
    const d = Number(arr[2])
    if (a === b) {
      console.log('DRAW')
    } else {
      if (d > 0) {
        console.log(a > b ? 'A' : 'B')
      } else {
        console.log(a > b ? 'B' : 'A')
      }
    }
  }
}
