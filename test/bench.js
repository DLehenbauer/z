const PRNG = require('../dist')
const lehmer32 = new PRNG.Lehmer32()
const xorShift32 = new PRNG.XorShift32()
const xorShift32Plus = new PRNG.XorShift32Plus()
const gameRand32 = new PRNG.GameRand32()

const Benchmark = require('benchmark')
const suite = new Benchmark.Suite
suite
  .add('GameRand32', () => {
    return gameRand32.next()
  })
  .add('XorShift32', () => {
    return xorShift32.next()
  })
  .add('XorShift32Plus', () => {
    return xorShift32Plus.next()
  })
  .add('Lehmer32', () => {
    return lehmer32.next()
  })
  .add('Math.random()', () => {
    return Math.random()
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ 'async': true })
