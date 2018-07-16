const PRNG = require('../dist')
const seed = (Math.random() * 0xFFFFFFFF) >>> 0
const rng = new PRNG.XorShift32(seed)

let period = 0
let initial = rng.next()
let value = initial

console.log(`seed: ${seed}`)
console.log(`initial: ${initial}`)

do {
  value = rng.next()
  if (!(0 <= value && value < 1)) {
      throw new Error(`Produced out of range value: '${value}'`);
  }
  period++
} while (value !== initial)

console.log(`period: ${period}`)