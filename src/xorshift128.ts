// https://en.wikipedia.org/wiki/Xorshift
export class XorShift128 {
  private x: number
  private y: number
  private z: number
  private w: number
    
  constructor(seed0: number, seed1 = 362436069, seed2 = 521288629, seed3 = 88675123) {
    seed0 |= 0
    this.x = seed0 === 0
      ? 123456789
      : seed0
    this.y = seed1
    this.z = seed2
    this.w = seed3
  }
  
  public next() {
    let x = this.x
    let y = this.y
    let z = this.z
    let w = this.w

    // Algorithm "xor128" from p. 5 of Marsaglia, "Xorshift RNGs"
    const t = (x ^ (x << 11))
    x = y; y = z; z = w
    w = (w ^ (w >>> 19)) ^ (t ^ (t >>> 8))

    const r = ~w
  
    this.x = x
    this.y = y
    this.z = z
    this.w = w
      
    return (r >>> 0) / 0xFFFFFFFF
  }
}