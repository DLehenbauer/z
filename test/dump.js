const RNG = require('../dist')
const ChiSquared = require('./chi-squared')

function createRng(name, seed) {
  switch (name.toLowerCase()) {
    case 'gamerand32': return new RNG.GameRand32(seed)
    case 'lehmer32': return new RNG.Lehmer32(seed)
    case 'xorshift32': return new RNG.XorShift32(seed)
    case 'xorshift32plus': return new RNG.XorShift32Plus(seed)
    case 'xorshift128': return new RNG.XorShift128(seed)
    default:
      throw `Invalid argument for -name: '${name}'`
  }
}

const rng = createRng(process.argv[2], parseInt(process.argv[3]))

const iterations = 1000000
const numBuckets = 10000
const buckets = new Uint32Array(numBuckets)

const bits = []
for (let i = 0; i < 32; i++) {
  bits[i] = new Uint32Array(2)
}

for (let i = 0; i < iterations; i++) {
  const value = rng.next()
  buckets[(value * numBuckets) | 0]++

  const asInt32 = (value * 0xFFFFFFFF) >>> 0
  for (let j = 0; j < 32; j++) {
    const bitValue = (asInt32 & (1 << j)) === 0
      ? 0
      : 1

    bits[j][bitValue]++
  }
}

let xs = 0
for (let i = 0; i < buckets.length; i++) {
  const np = iterations / numBuckets
  const Y = buckets[i] / iterations
  const d = Y - np
  xs += (d * d) / np
  console.log(`${i}: ${buckets[i]}`)
}

const df = iterations - 1
console.log(`Xs = ${xs}, df = ${df}`)
console.log(`p-value = ${ChiSquared.pochisq(xs, df)}`)

/*
for (let i = 0; i < 32; i++) {
  const ones = bits[i][0]
  const zeros = bits[i][1]
  const ratio = ones / (ones + zeros)
  console.log(`${i}: ${ratio}`)
}
*/