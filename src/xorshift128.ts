// https://en.wikipedia.org/wiki/Xorshift
export class XorShift128 {
  private x: number
  private y: number
  private z: number
  private w: number
    
  constructor(seed0?: number, seed1 = 362436069, seed2 = 521288629, seed3 = 88675123) {
    this.x = (seed0 as number | 0) || 123456789
    this.y = seed1 | 0
    this.z = seed2 | 0
    this.w = seed3 | 0
    
    // Discard the first 8 results to ensure inital bits have been sufficient mixed.
    for (let i = 0; i < 8; i++) {
      this.next()
    }
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