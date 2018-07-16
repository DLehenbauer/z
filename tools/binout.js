const RNG = require('../dist')

function createRng(name, seed) {
  switch (name.toLowerCase()) {
    case 'gamerand32': return new RNG.GameRand32(seed)
    case 'xorshift32': return new RNG.XorShift32(seed)
    case 'xorshift32plus': return new RNG.XorShift32Plus(seed)
    default:
      throw `Invalid argument for -name: '${name}'`
  }
}

const rng = createRng(process.argv[2], parseInt(process.argv[3]))
const buffer = new Buffer(4)

while (true) {
  const next = rng.next() * 0xFFFFFFFF
  buffer.writeUInt32LE(next, 0)
    
  try {
    //console.log(next)
    process.stdout.write(buffer)
  } catch (e) {
    break
  }
}
