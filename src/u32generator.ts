export default abstract class U32Generator {
  public abstract nextUint32(): number;

  public nextBits(numBits: number) {
    return this.nextUint32() >>> (32 - numBits)
  }
  
  public nextUint32Below(max: number) {
    const n = (0xFFFFFFFF / max) >>> 0;
  
    let r: number;
    do {
      r = (this.nextUint32() / n) >>> 0;
    } while (r >= max)
    
    return r
  }
  
  public nextInt32() {
    return this.nextUint32() | 0
  }
  
  public nextBoolean() {
    return this.nextInt32() < 0
  }
  
  /**
   * @summary Returns a non-negative 53-bit integer.
   * 
   * @desc Constructs a non-negative 53-bit integer by combining the next two psuedo-random
   * 32-bit integers from the generator's sequence.
   * 
   * When combining the 32-bit integers, the lower bits of both are discarded.  This helps
   * compensate for generators that produce weak lower bits.
   * 
   * @return An integer 'r' in the range 0 <= r < 2^53 (0 to 9,007,199,254,740,991 inclusive).
   */
  public nextUint53() {
    const hi26 = (this.nextUint32() >>> 6) * 0x08000000
    const lo27 = (this.nextUint32() >>> 5)
    return (hi26 + lo27)
  }
  
  /**
   * @return A floating point number 'r' in the range 0 <= r < (2^24 - 1) / 2^24
   * (0 inclusive to ~1 exclusive).
   */
  public nextFloat32() {
    const u24 = (this.nextUint32() >>> 8)
    return u24 / 0x1000000
  }
  
  /**
   * @return A floating point number 'r' in the range 0 <= r < (2^53 - 1) / 2^53
   * (0 inclusive to ~1 exclusive).
   */
  public nextFloat64() {
    return this.nextUint53() / 0x20000000000000
  }
  
  /**
   * @return A floating point number 'r' in the range 0 <= r < (2^32 - 1) / 2^32
   * (0 inclusive to ~1 exclusive).
   */
  public next() {
    const u32 = this.nextUint32()
    return u32 / 0x100000000
  }
}