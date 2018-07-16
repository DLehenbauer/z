const PRNG = require('../dist')
const xorShift32Plus = new PRNG.XorShift32Plus()
const gameRand32 = new PRNG.GameRand32()

const Benchmark = require('benchmark')
const suite = new Benchmark.Suite
suite.add('XorShift32Plus', () => {
  return xorShift32Plus.next()
})
.add('GameRand32', () => {
  return gameRand32.next()
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'))
})
.run({ 'async': true })
