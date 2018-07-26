const mlxsadd = require('ml-xsadd/xsadd-es5')
const PRNG = require('../dist')
const lehmer32 = new PRNG.Lehmer32()
const xsadd = new mlxsadd()
const xsadd128 = new PRNG.XSadd128(0)
const xorShift32 = new PRNG.XorShift32()
const xorShift32Plus = new PRNG.XorShift32Plus()
const xorshift128 = new PRNG.XorShift128()
const gameRand32 = new PRNG.GameRand32()

const Benchmark = require('benchmark')
const suite = new Benchmark.Suite()
let s = 0

suite
  .add('XSadd128',        () => { s += xsadd128.next() })
  .add('ms-xsadd',        () => { s += xsadd.getFloat() })
  .add('XSadd128 (2)',    () => { s += xsadd128.next() })
  .add('ms-xsadd (2)',    () => { s += xsadd.getFloat() })
  .add('XorShift128',     () => { s += xorshift128.next() })
  .add('GameRand32',      () => { s += gameRand32.next() })
  .add('XorShift32',      () => { s += xorShift32.next() })
  .add('XorShift32Plus',  () => { s += xorShift32Plus.next() })
  .add('Lehmer32',        () => { s += lehmer32.next() })
  .add('Math.random()',   () => { s += Math.random() })
  .on('cycle', event => {
    console.log(String(event.target))
  })
  .on('error', event => {
    console.error(event.target.error);
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
    console.log(s)
  })
  .run({ 'async': false })
