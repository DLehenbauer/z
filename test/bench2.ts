import { Suite } from './hotloop'
import * as PRNG from '../dist'

//const lehmer32 = new PRNG.Lehmer32()
const xsadd128 = new PRNG.XSadd128()
const xorShift32 = new PRNG.XorShift32()
//const xorShift32Plus = new PRNG.XorShift32Plus()
//const xorshift128 = new PRNG.XorShift128()
//const gameRand32 = new PRNG.GameRand32()

const suite = new Suite()
  .add('xsadd128', () => { return xsadd128.next() })
  .add('xorshift32', () => { return xorShift32.next() })

while (true) {
  suite.run()
  console.log(suite.toString())
}
