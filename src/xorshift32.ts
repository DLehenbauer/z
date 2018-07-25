/*
// https://en.wikipedia.org/wiki/Xorshift
export class XorShift32 {
  private y: number;
  
  constructor(seed?: number) {
    this.y = (seed as number | 0) || 2463534242
  }

  public next() {
    let y = this.y

    // Algorithm "xor" from p. 4 of Marsaglia, "Xorshift RNGs"
    y ^= (y << 13)
    y ^= (y >>> 17)
    y ^= (y << 5)

    const r = ~y

    this.y = y
    
    return (r >>> 0) / 0xFFFFFFFF
  }
}
*/

export class XorShift32 {
  private y: number

  constructor(seed0?: number) {
    this.y = (seed0 as number | 0) || 0x49616E42

    // Discard the first 8 results to ensure inital bits have been sufficient mixed.
    for (let i = 0; i < 8; i++) {
      this.nextUint32()
    }
  }
  
  /**
   * Returns a psuedo-random unsigned 32-bit integer 'r' in the range 0 <= r < 2^32
   * (0 to 4294967295 inclusive).
   * 
   * Note that the XSadd algorithm is known to produce weak lower bits.  For better statistical results,
   * discard lower bits with right shift (>>) or division when less than 32 bits are
   * needed.
   */
  public nextUint32() {
    const y = this.y

    let t = y;
    t ^= t << 13;
    t ^= t >>> 17;
    t ^= t << 5;
    
    this.y = ~t

    return t >>> 0
  }

  public nextInt32() {
    return this.nextUint32() | 0
  }

  public next() {
    const r = this.nextUint32()
    return r / 0xFFFFFFFF
  }
}