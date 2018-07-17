// https://en.wikipedia.org/wiki/Xorshift
export class Lehmer32 {
    private x: number;
    
    constructor(seed: number) {
      seed |= 0
      
      this.x = seed === 0
        ? 2463534242
        : seed
    }
  
    public next() {
      const a = 16807
      const m = 2157483647
      const q = 127773
      const r = 2836

      let x = this.x
      const x_div_q = Math.trunc(x / q)
      const x_mod_q = x - (q * x_div_q)
      
      x = a * x_mod_q - r * x_div_q
      if (x <= 0) {
        x += m
      }

      this.x = x

      return x / m
    }
  }