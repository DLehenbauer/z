const PRNG = require('../dist')
const lehmer32 = new PRNG.Lehmer32()
const xsadd128 = new PRNG.XSadd128(0)
const xorShift32 = new PRNG.XorShift32()
const xorShift32Plus = new PRNG.XorShift32Plus()
const xorshift128 = new PRNG.XorShift128()
const gameRand32 = new PRNG.GameRand32()

const Benchmark = require('benchmark')
const suite = new Benchmark.Suite()
suite
  .add('XSadd128',        () => { return xsadd128.next() })
  .add('XorShift128',     () => { return xorshift128.next() })
  .add('GameRand32',      () => { return gameRand32.next() })
  .add('XorShift32',      () => { return xorShift32.next() })
  .add('XorShift32Plus',  () => { return xorShift32Plus.next() })
  .add('Lehmer32',        () => { return lehmer32.next() })
  .add('Math.random()',   () => { return Math.random() })
  .on('cycle', event => {
    console.log(String(event.target))
  })
  .on('error', event => {
    console.error(event.target.error);
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ 'async': false })
