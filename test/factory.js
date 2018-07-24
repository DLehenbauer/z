const PRNG = require('../dist')

const nameToConstructor = {
  'gamerand32': PRNG.GameRand32,
  'xorshift32': PRNG.XorShift32,
  'xorshift32plus': PRNG.XorShift32Plus,
  'lehmer32': PRNG.Lehmer32,
}

module.exports = { nameToConstructor }