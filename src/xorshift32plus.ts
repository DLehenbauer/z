export class XorShift32Plus {
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

    // https://en.wikipedia.org/wiki/Xorshift#xorshift+
    const r = ~(y + this.y)

    this.y = y
    
    return (r >>> 0) / 0x100000000
  }
}